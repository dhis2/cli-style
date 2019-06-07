const log = require('@dhis2/cli-helpers-engine').reporter

const { runner } = require('../../tools/js')
const { selectFiles } = require('../../files.js')

exports.command = 'check [files..]'

exports.describe = 'Check JS format.'

exports.builder = {
    all: {
        describe:
            'Default behaviour is to only format files staged with Git, use this option to format all files.',
        type: 'boolean',
        default: 'false',
    },
}

exports.handler = argv => {
    const { files, all } = argv

    const root = process.cwd()
    log.debug(`Root directory: ${root}`)

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
