const log = require('@dhis2/cli-helpers-engine').reporter

const { runner } = require('../../tools/js')
const { collectFiles } = require('../../files.js')
const { staged_files } = require('../../tools/git')

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

    let codeFiles
    if (all) {
        codeFiles = collectFiles(root)
    } else if (files) {
        codeFiles = files
    } else {
        codeFiles = staged_files(root)
    }

    const report = runner(codeFiles)
    report.summary()

    if (report.hasViolations) {
        process.exit(1)
    }
}
