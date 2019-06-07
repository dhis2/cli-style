const fs = require('fs-extra')
const path = require('path')

const log = require('@dhis2/cli-helpers-engine').reporter

const { selectFiles } = require('../files.js')
const { stageFiles } = require('../git-files.js')

exports.command = 'validate [groups..]'

exports.describe = 'Validate DHIS2 configurations for a/all group(s)'

exports.builder = {
    fix: {
        describe: 'Fix problems that can be fixed automatically',
        type: 'boolean',
        default: 'false',
    },
    stage: {
        describe:
            'By default the changed files are staged automatically, use `--no-stage` to avoid staging files automatically.',
        type: 'boolean',
        default: 'true',
    },
    all: {
        describe:
            'Default behaviour is to only format files staged with Git, use this option to format all files.',
        type: 'boolean',
        default: 'false',
    },
}

exports.handler = argv => {
    const { fix, groups, stage, all } = argv
    const root = process.cwd()

    const files = selectFiles(null, all, root)

    const reports = runners(files, groups, fix)

    let violations = 0
    const fixedFiles = []
    for (const report of reports) {
        report.summarize()

        if (report.hasViolations) {
            violations += report.violations.length
        }

        if (fix) {
            const fixed = report.fix()
            fixedFiles.push(...fixed)
        }
    }

    if (violations > 0) {
        log.info('')
        log.error(`${violations} file(s) violate the code standard.`)
        process.exit(1)
    }

    if (stage && fixedFiles.length > 0) {
        stageFiles(fixedFiles, root)
    }
}

function runners(files, groups = ['all'], fix = false) {
    const reports = []
    let tools

    log.info(`Running validations for groups: ${groups.join(', ')}`)
    try {
        tools = fs.readdirSync(path.join(__dirname, '../tools'))
        tools = tools.filter(tool => tool !== 'git')

        if (!groups.includes('all')) {
            tools = tools.filter(t => groups.includes(t))
        }
    } catch (e) {
        log.error(e)
    }

    const loadedTools = tools.map(t =>
        require(path.join(__dirname, '../tools', t))
    )

    for (const t in loadedTools) {
        const result = loadedTools[t].runner(files, fix)
        reports.push(result)
    }

    return reports
}
