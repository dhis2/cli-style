const path = require('path')

//const lintStaged = require('lint-staged')
const log = require('@dhis2/cli-helpers-engine').reporter

const { groups, isValidGroup } = require('../groups.js')
const { run } = require('../run.js')

const {
    CONSUMING_ROOT,
    PRETTIER_CONFIG,
    ESLINT_CONFIG,
    LINT_STAGED_CONFIG,
} = require('../paths.js')

const { collectRejectedFiles, deleteFile } = require('../files.js')

exports.command = 'validate'

exports.describe = 'Run validation pre-commit hook'

exports.builder = {
    fix: {
        describe:
            'Fix problems that can be fixed automatically, use `--no-fix` to check files without applying fixes.',
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
    lintStagedConfig: {
        describe: 'Override the Lint Staged configuration.',
        type: 'string',
        default: LINT_STAGED_CONFIG,
    },
}

exports.handler = argv => {
    const { fix, stage, eslintConfig, prettierConfig, lintStagedConfig } = argv

    const env = {
        ...process.env,
        CLI_STYLE_ESLINT_CONFIG: path.resolve(CONSUMING_ROOT, eslintConfig),
        CLI_STYLE_PRETTIER_CONFIG: path.resolve(CONSUMING_ROOT, prettierConfig),
        CLI_STYLE_FIX: `${fix}`,
        CLI_STYLE_STAGE: `${stage}`,
    }

    const cmd = 'npx'
    const args = [
        '--no-install',
        'lefthook',
        '--edit',
    ]

    run(cmd, args, {
        env,
    })

    /*
    lintStaged({
        configPath: path.resolve(CONSUMING_ROOT, lintStagedConfig),
        quiet: false,
        debug: false,
    })
        .then(s => {
            collectRejectedFiles(CONSUMING_ROOT).map(deleteFile)
            if (!s) {
                process.exit(1)
            }
            process.exit(0)
        })
        .catch(e => {
            log.error('Failed to parse lint-staged configuration', e)
            process.exit(1)
        })
    */
}
