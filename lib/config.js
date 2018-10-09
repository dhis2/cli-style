/** @format */

const path = require('path')
const fs = require('fs')

const log = require('./log.js')
const { readFile, writeFile } = require('./files.js')

function wipe_prop_cfg(repo) {
    const pkg_path = path.join(repo, 'package.json')

    try {
        const fd = fs.readFileSync(pkg_path)
        const data = JSON.parse(fd.toString('utf8'))

        if (data.prettier) {
            log.debug('prettier key found in package.json, nuking..')
            delete data.prettier

            const out = JSON.stringify(data, null, 2) + '\n'
            try {
                fs.writeFileSync(pkg_path, out)
                log.info(pkg_path + ' updated and saved')
            } catch (err) {
                log.debug('failed to get package.json for repo: ' + repo)
            }
        } else {
            log.debug('no prettier key found...')
        }
    } catch (e) {
        log.debug('failed to get package.json: ' + pkg_path)
    }
}

function wipe_file_cfg(repo) {
    const cfg_list = [
        '.prettierrc',
        '.prettierrc.yaml',
        '.prettierrc.yml',
        '.prettierrc.json',
        '.prettierrc.toml',
        'prettier.config.js',
    ]

    cfg_list.map(cfg => {
        try {
            fs.unlinkSync(path.join(repo, cfg))
            log.info(cfg + ' removed from repo: ' + repo)
        } catch (err) {
            log.debug('no such file')
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
        log.info('copied cfg successfully: ' + to)
    } catch (err) {
        log.debug('failed to copy cfg to: ' + to)
    }
}

function configure(cwd, repo) {
    // first house keeping
    cleanup(repo)

    // then fun stuff
    const cfgs = [
        [
            path.join(cwd, 'config', 'prettier.config.js'),
            path.join(repo, '.prettierrc.js')
        ],
        [
            path.join(cwd, 'config', 'browserslist.config.rc'),
            path.join(repo, '.browserslistrc')
        ],
        [
            path.join(cwd, 'config', 'eslint.config.js'),
            path.join(repo, '.eslintrc.js')
        ],
    ].map(cfg => copy(cfg[0], cfg[1]))
}

module.exports = configure
