const path = require('path')
const fs = require('fs')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('./files.js')

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

function cleanup(repo) {
    wipeConfigProperties(repo)
    wipeConfigFiles(repo)
}

function copy(from, to) {
    try {
        fs.copyFileSync(from, to)
        log.debug('copied cfg successfully: ' + to)
    } catch (err) {
        log.error('failed to copy cfg to: ' + to, err)
    }
}

function configure(repo) {
    // first house keeping
    cleanup(repo)

    // then fun stuff
    const cfgs = [
        [
            path.join(__dirname, '../config/prettier.config.js'),
            path.join(repo, '.prettierrc.js'),
        ],
        [
            path.join(__dirname, '../config/browserslist.config.rc'),
            path.join(repo, '.browserslistrc'),
        ],
        [
            path.join(__dirname, '../config/editorconfig.config.rc'),
            path.join(repo, '.editorconfig'),
        ],
        [
            path.join(__dirname, '../config/eslint.config.js'),
            path.join(repo, '.eslintrc.js'),
        ],
    ].map(cfg => copy(cfg[0], cfg[1]))
}

module.exports = configure
