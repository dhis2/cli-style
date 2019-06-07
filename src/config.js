const path = require('path')
const fs = require('fs-extra')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('./files.js')
const { groups, isValidGroup } = require('./groups.js')

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

module.exports = {
    configure: function configure(repo, group = ['all'], init) {
        const validGroups = group.filter(isValidGroup)

        if (validGroups.length === 0) {
            log.warn(
                `No valid group selected, use one of: ${Object.keys(
                    groups
                ).join(', ')}`
            )
        } else {
            log.info(`Running setup for group(s): ${validGroups.join(', ')}`)
        }

        return validGroups.map(g =>
            groups[g].configs.map(c => copy(c[0], c[1], init))
        )
    },
    cleanup: function cleanup(repo) {
        wipeConfigProperties(repo)
        wipeConfigFiles(repo)
    },
}
