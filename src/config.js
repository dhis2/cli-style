const path = require('path')
const fs = require('fs-extra')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('./files.js')

const cfgs = {
    repo: [
        [
            path.join(__dirname, '../config/editorconfig.config.rc'),
            path.join('.editorconfig'),
        ],
        [
            path.join(__dirname, '../config/github/dependabot.yml'),
            path.join('.dependabot', 'config.yml'),
        ],
        [
            path.join(__dirname, '../config/github/stale.yml'),
            path.join('.github', 'stale.yml'),
        ],
    ],
    js: [
        [
            path.join(__dirname, '../config/js/eslint.config.js'),
            path.join('.eslintrc.js'),
        ],
        [
            path.join(__dirname, '../config/js/prettier.config.js'),
            path.join('.prettierrc.js'),
        ],
        [
            path.join(__dirname, '../config/js/browserslist.config.rc'),
            path.join('.browserslistrc'),
        ],
        [
            path.join(__dirname, '../config/commitlint.config.js'),
            path.join('.commitlintrc.js'),
        ],
    ],
}

function wipeConfigProperties(repo) {
    const pkgPath = path.join(repo, 'package.json')

    try {
        const fd = fs.readFileSync(pkgPath)
        const data = JSON.parse(fd.toString('utf8'))

        delete data.prettier

        const out = JSON.stringify(data, null, 2) + '\n'
        try {
            fs.writeFileSync(pkgPath, out)
            log.debug(pkgPath + ' updated and saved')
        } catch (err) {
            log.error('failed to get package.json for repo: ' + repo)
        }
    } catch (e) {
        log.error('failed to get package.json: ' + pkgPath)
    }
}

function wipeConfigFiles(repo) {
    const configs = [
        '.prettierrc',
        '.prettierrc.yaml',
        '.prettierrc.yml',
        '.prettierrc.json',
        '.prettierrc.toml',
        '.prettier.config.js',
        'prettier.config.js',
        '.prettierrc.js',
        '.browserslistrc',
        '.editorconfig',
    ]

    configs.map(cfg => {
        try {
            fs.unlinkSync(path.join(repo, cfg))
            log.debug(cfg + ' removed from repo: ' + repo)
        } catch (err) {
            log.debug('no such file', err)
        }
    })
}

function copy(from, to, overwrite = true) {
    try {
        fs.ensureDirSync(path.dirname(to))
        fs.copySync(from, to, { overwrite })
        if (fs.existsSync(to) && overwrite) {
            log.info(
                `Installing configuration file: ${path.relative(
                    process.cwd(),
                    to
                )}`
            )
        } else {
            log.warn(
                `Skip existing configuration file: ${path.relative(
                    process.cwd(),
                    to
                )}`
            )
        }
    } catch (err) {
        log.error(`Failed to install configuration file: ${to}`, err)
    }
}

function validateGroups(groups) {
    const result = []

    for (const group of groups) {
        if (!cfgs.hasOwnProperty(group) && group !== 'all') {
            result.push(group)
        }
    }

    return result
}

module.exports = {
    configure: function configure(repo, groups = ['all'], init) {
        const valid = validateGroups(groups)

        if (valid.length !== 0) {
            log.error(`Invalid groups detected: ${valid.join(', ')}`)
            process.exit(1)
        }

        if (groups.includes('all')) {
            for (const prop in cfgs) {
                cfgs[prop].map(cfg =>
                    copy(cfg[0], path.join(repo, cfg[1]), init)
                )
            }
        } else {
            for (const group of groups) {
                cfgs[group].map(cfg =>
                    copy(cfg[0], path.join(repo, cfg[1]), init)
                )
            }
        }
    },
    cleanup: function cleanup(repo) {
        wipeConfigProperties(repo)
        wipeConfigFiles(repo)
    },
}
