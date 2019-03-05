const path = require('path')
const fs = require('fs')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('./files.js')

function wipe_prop_cfg(repo) {
    const pkg_path = path.join(repo, 'package.json')

    try {
        const fd = fs.readFileSync(pkg_path)
        const data = JSON.parse(fd.toString('utf8'))

        delete data.prettier

        const out = JSON.stringify(data, null, 2) + '\n'
        try {
            fs.writeFileSync(pkg_path, out)
            log.debug(pkg_path + ' updated and saved')
        } catch (err) {
            log.error('failed to get package.json for repo: ' + repo)
        }
    } catch (e) {
        log.error('failed to get package.json: ' + pkg_path)
    }
}

function wipe_file_cfg(repo) {
    const wipe_cfg_list = [
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

    wipe_cfg_list.map(cfg => {
        try {
            fs.unlinkSync(path.join(repo, cfg))
            log.debug(cfg + ' removed from repo: ' + repo)
        } catch (err) {
            log.debug('no such file', err)
        }
    })
}

function cleanup(repo) {
    wipe_prop_cfg(repo)
    wipe_file_cfg(repo)
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
    ].map(cfg => copy(cfg[0], cfg[1]))
}

module.exports = configure
