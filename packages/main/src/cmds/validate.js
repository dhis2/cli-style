const fs = require('fs-extra')
const path = require('path')

const log = require('@dhis2/cli-helpers-engine').reporter

const { selectFiles } = require('../files.js')
const { stageFiles } = require('../git-files.js')
const { groups, isValidGroup } = require('../groups.js')

const { spawnSync } = require('child_process')

exports.command = 'validate [group..]'

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
    const { fix, group, stage, all } = argv

    const cmd = 'npx'
    const args = [
        '--no-install',
        'lint-staged',
        '--config',
        path.join(__dirname, '..', '..', 'config', 'lint-staged.config.js'),
    ]

    const run = spawnSync(cmd, args, {
        env: {
            ...process.env,
            CLI_STYLE_FIX: fix,
            CLI_STYLE_STAGE: stage,
            CLI_STYLE_ALL: all,
        },
        cwd: process.cwd(),
        encoding: 'utf8',
    })

    console.log(run)

    if (run.stderr) {
        log.warn(run.stderr)
        process.exit(1)
    }
}

/*
argv => {
    const { fix, group, stage, all } = argv
    const root = process.cwd()

    const files = selectFiles(null, all, root)

    const reports = runners(files, group, fix)

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
        log.error(`${violations} file(s) violate the code standard.`)
        process.exit(1)
    }

    if (stage && fixedFiles.length > 0) {
        stageFiles(fixedFiles, root)
    }
}

function runners(files, group = ['all'], fix = false) {
    const validGroups = group.filter(isValidGroup)

    if (validGroups.length === 0) {
        log.warn(
            `No valid group selected, use one of: ${Object.keys(groups).join(
                ', '
            )}`
        )
    } else {
        log.info(`Running validations for group(s): ${validGroups.join(', ')}`)
    }

    return validGroups
        .map(g => groups[g].tools.map(fn => fn(files, fix)))
        .reduce((a, b) => a.concat(b), [])
}
*/
