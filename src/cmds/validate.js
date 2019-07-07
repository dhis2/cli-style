const path = require('path')

const lintStaged = require('lint-staged')
const log = require('@dhis2/cli-helpers-engine').reporter

const { groups, isValidGroup } = require('../groups.js')
const {
    CONFIG_DIR,
    PRETTIER_CONFIG,
    ESLINT_CONFIG,
    LINT_STAGED_CONFIG,
} = require('../config.js')

exports.command = 'validate [group..]'

exports.describe = 'Validate DHIS2 configurations for a/all group(s)'

exports.builder = {
    fix: {
        describe: 'Fix problems that can be fixed automatically',
        type: 'boolean',
        default: 'true',
    },
    stage: {
        describe:
            'By default the changed files are staged automatically, use `--no-stage` to avoid staging files automatically.',
        type: 'boolean',
        default: 'true',
    },
    eslintConfig: {
        describe: 'Override the ESLint configuration.',
        type: 'string',
        default: ESLINT_CONFIG,
    },
    prettierConfig: {
        describe: 'Override the Prettier configuration.',
        type: 'string',
        default: PRETTIER_CONFIG,
    },
}

exports.handler = argv => {
    const { fix, group = ['all'], stage, eslintConfig, prettierConfig } = argv

    const validGroups = group.filter(isValidGroup)
    if (validGroups.length === 0) {
        log.warn(
            `No valid group selected, use one of: ${Object.keys(groups).join(
                ', '
            )}`
        )
        process.exit(1)
    } else {
        log.info(`Running validations for group(s): ${validGroups.join(', ')}`)
    }

    process.env = {
        ...process.env,
        CLI_STYLE_ESLINT_CONFIG: eslintConfig,
        CLI_STYLE_PRETTIER_CONFIG: prettierConfig,
        CLI_STYLE_FIX: `${fix}`,
        CLI_STYLE_STAGE: `${stage}`,
        CLI_STYLE_GROUPS: validGroups.join(','),
    }

    lintStaged({
        configPath: LINT_STAGED_CONFIG,
        quiet: true,
        debug: false,
    })
        .then(s => {
            if (!s) {
                process.exit(1)
            }
            process.exit(0)
        })
        .catch(e => {
            log.error('Failed to parse lint-staged configuration', e)
            process.exit(1)
        })
}
