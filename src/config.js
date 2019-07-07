const path = require('path')
const fs = require('fs-extra')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('./files.js')

const CONFIG_ROOT = path.join(__dirname, '..')
const CONFIG_DIR = path.join(CONFIG_ROOT, 'config')

const ESLINT_CONFIG = path.join(CONFIG_DIR, 'js', 'eslint.config.js')
const PRETTIER_CONFIG = path.join(CONFIG_DIR, 'js', 'prettier.config.js')
const LINT_STAGED_CONFIG = path.join(CONFIG_DIR, 'lint-staged.config.js')
const BROWSERSLIST_CONFIG = path.join(
    CONFIG_DIR,
    'js',
    'browserslist.config.rc'
)
const COMMITLINT_CONFIG = path.join(CONFIG_DIR, 'commitlint.config.js')
const EDITORCONFIG_CONFIG = path.join(CONFIG_DIR, 'editorconfig.config.rc')
const DEPENDABOT_CONFIG = path.join(CONFIG_DIR, 'github', 'dependabot.yml')
const STALE_CONFIG = path.join(CONFIG_DIR, 'github', 'stale.yml')
const SEMANTIC_PR_CONFIG = path.join(CONFIG_DIR, 'github', 'semantic.yml')

function copy(from, to, overwrite = true) {
    try {
        if (fs.existsSync(to) && !overwrite) {
            log.warn(
                `Skip existing configuration file: ${path.relative(
                    process.cwd(),
                    to
                )}`
            )
        } else {
            log.info(
                `Installing configuration file: ${path.relative(
                    process.cwd(),
                    to
                )}`
            )
        }
        fs.ensureDirSync(path.dirname(to))
        fs.copySync(from, to, { overwrite })
    } catch (err) {
        log.error(`Failed to install configuration file: ${to}`, err)
    }
}

function configure(repo, group = ['all'], overwrite) {
    const { groups, isValidGroup } = require('./groups.js')
    const validGroups = group.filter(isValidGroup)

    if (validGroups.length === 0) {
        log.warn(
            `No valid group selected, use one of: ${Object.keys(groups).join(
                ', '
            )}`
        )
    } else {
        log.info(`Running setup for group(s): ${validGroups.join(', ')}`)
    }

    return validGroups.map(g =>
        groups[g].configs.map(c => copy(c[0], c[1], overwrite))
    )
}

module.exports = {
    BROWSERSLIST_CONFIG,
    COMMITLINT_CONFIG,
    CONFIG_ROOT,
    CONFIG_DIR,
    DEPENDABOT_CONFIG,
    EDITORCONFIG_CONFIG,
    ESLINT_CONFIG,
    LINT_STAGED_CONFIG,
    PRETTIER_CONFIG,
    SEMANTIC_PR_CONFIG,
    STALE_CONFIG,

    configure,
}
