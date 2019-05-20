const log = require('@dhis2/cli-helpers-engine').reporter

const { runner } = require('../../tools/package')
const { selectFiles, jsonFiles } = require('../../files.js')

exports.command = 'check [file..]'

exports.describe = 'Check package format.'

exports.builder = {
    all: {
        describe:
            'Default behaviour is to only format files staged with Git, use this option to format all files.',
        type: 'boolean',
        default: 'false',
    },
}

exports.handler = argv => {
    const { file, all } = argv

    const root = process.cwd()
    log.debug(`Root directory: ${root}`)

    const files = selectFiles(file, all, root)
    const report = runner(files)

    report.summarize()

    if (report.hasViolations) {
        process.exit(1)
    }
}
