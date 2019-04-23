const path = require('path')

const log = require('@dhis2/cli-helpers-engine').reporter

const { collectFiles, jsFiles, writeFile } = require('../../files.js')
const { runner } = require('../../tools/js')
const { stage_files, staged_files } = require('../../tools/git')

exports.command = 'apply [files..]'

exports.describe = 'Apply JS format.'

exports.builder = {
    all: {
        describe:
            'Default behaviour is to only format files staged with Git, use this option to format all files.',
        type: 'boolean',
        default: 'false',
    },
    stage: {
        describe:
            'By default the changed files are staged automatically, use `--no-stage` to avoid staging files automatically.',
        type: 'boolean',
        default: 'true',
    },
}

exports.handler = argv => {
    const { all, stage, files } = argv

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

    const fixed = report.fix()

    if (stage) {
        stage_files(fixed, root)
    }
}
