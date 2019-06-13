const path = require('path')

const log = require('@dhis2/cli-helpers-engine').reporter

const { selectFiles } = require('../../files.js')
const { stageFiles } = require('../../git-files.js')

const { runner } = require('../../tools/js')

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

    stashUnstagedChanges(root)
    const codeFiles = selectFiles(files, all, root)
    const report = runner(codeFiles, true)

    report.summarize()

    if (report.hasViolations) {
        log.error(
            `${report.violations.length} file(s) violate the code standard.`
        )
        process.exit(1)
    }

    const fixed = report.fix()

    if (stage && fixed.length > 0) {
        stageFiles(fixed, root)
    }

    popStash(root)
}
