const log = require('@dhis2/cli-helpers-engine').reporter

const { runner } = require('../../tools/package')
const { selectFiles, jsonFiles } = require('../../files.js')
const { stageFiles } = require('../../git-files.js')

exports.command = 'apply [file..]'

exports.describe = 'Apply package format.'

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
    const { file, all, stage } = argv

    const root = process.cwd()
    log.debug(`Root directory: ${root}`)

    const files = selectFiles(file, all, root)
    const report = runner(files, true)

    report.summarize()

    if (report.hasViolations) {
        log.info('')
        log.error(
            `${report.violations.length} file(s) violate the code standard.`
        )
        process.exit(1)
    }

    const fixed = report.fix()

    if (stage && fixed.length > 0) {
        stageFiles(fixed, root)
    }
}
