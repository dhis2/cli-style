const log = require('@dhis2/cli-helpers-engine').reporter

const { runner } = require('../../tools/js')
const { selectFiles } = require('../../files.js')
const { PRETTIER_CONFIG, ESLINT_CONFIG } = require('../../config.js')

exports.command = 'check [files..]'

exports.describe = 'Check JS format.'

exports.builder = {
    all: {
        describe:
            'Default behaviour is to only format files staged with Git, use this option to format all files.',
        type: 'boolean',
        default: 'false',
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
    const { files, all, eslintConfig, prettierConfig } = argv

    const root = process.cwd()
    log.debug(`Root directory: ${root}`)

    process.env = {
        ...process.env,
        CLI_STYLE_ESLINT_CONFIG: eslintConfig,
        CLI_STYLE_PRETTIER_CONFIG: prettierConfig,
    }

    const codeFiles = selectFiles(files, all, root)
    const report = runner(codeFiles)

    report.summarize()

    if (report.hasViolations) {
        log.error(
            `${report.violations.length} file(s) violate the code standard.`
        )
        process.exit(1)
    }
}
