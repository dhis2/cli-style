const path = require('path')
const fs = require('fs-extra')

const lintStaged = require('lint-staged')
const log = require('@dhis2/cli-helpers-engine').reporter

const { selectFiles } = require('../files.js')

const {
    popStash,
    stageFiles,
    stashUnstagedChanges,
    getStagedFilesAmount,
} = require('../git-files.js')

const { groups, isValidGroup, CONFIG_DIR } = require('../groups.js')

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
    const { fix, group = ['all'], stage, all } = argv

    const validGroups = group.filter(isValidGroup)
    if (validGroups.length === 0) {
        log.warn(
            `No valid group selected, use one of: ${Object.keys(groups).join(
                ', '
            )}`
        )
        process.exit(1)
    } else {
        log.info(`Running validations for group(s): ${validGroups.join(', ')}`)
    }

    process.env = {
        ...process.env,
        CLI_STYLE_FIX: `${fix}`,
        CLI_STYLE_STAGE: `${stage}`,
        CLI_STYLE_GROUPS: validGroups.join(','),
    }

    lintStaged({
        configPath: path.join(CONFIG_DIR, 'lint-staged.config.js'),
        quiet: true,
        debug: false,
    })
        .then(s => {
            if (!s) {
                log.error('There were validation errors')
                process.exit(1)
            }
            process.exit(0)
        })
        .catch(e => {
            log.error('Failed to parse lint-staged configuration', e)
            process.exit(1)
        })
}

/*
exports.handler = argv => {
    const { fix, group, stage, all } = argv
    const root = process.cwd()

    const files = selectFiles(null, all, root)

    const reports = runners(files, group, fix)

    const stashChanges = !all && getStagedFilesAmount(root)

    let violations = 0
    const fixedFiles = []

    if (stashChanges) stashUnstagedChanges(root)

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

    const hasViolations = violations > 0

    if (hasViolations) {
        log.error(`${violations} file(s) violate the code standard.`)
    }

    log.debug(`Fixed files count: ${fixedFiles.length}`)
    if (!hasViolations && stage && fixedFiles.length > 0) {
        stageFiles(fixedFiles, root)
    }

    if (stashChanges) popStash(root)

    if (hasViolations) {
        process.exit(1)
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