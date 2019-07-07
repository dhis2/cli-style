const fs = require('fs-extra')
const path = require('path')

const log = require('@dhis2/cli-helpers-engine').reporter

const { selectFiles } = require('../files.js')
const { stageFiles } = require('../git-files.js')
const { groups, isValidGroup, CONFIG_DIR } = require('../groups.js')

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

    const cmd = 'npx'
    const args = [
        '--no-install',
        'lint-staged',
        '--config',
        path.join(CONFIG_DIR, 'lint-staged.config.js'),
    ]

    // TODO: if `all` is set to true, we need to bypass lint-staged and run
    // the commands manually as lint-staged only ever runs on staged
    // files, hence the name.
    const run = spawnSync(cmd, args, {
        env: {
            ...process.env,
            CLI_STYLE_FIX: fix,
            CLI_STYLE_STAGE: stage,
            CLI_STYLE_GROUPS: validGroups.join(','),
        },
        cwd: process.cwd(),
        encoding: 'utf8',
    })

    if (run.stderr) {
        log.error(run.stderr)
        process.exit(1)
    }

    log.info(run.stdout)
}
