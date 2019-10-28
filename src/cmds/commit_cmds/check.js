const log = require('@dhis2/cli-helpers-engine').reporter

const { run } = require('../../run.js')

const {
    COMMITLINT_CONFIG
} = require('../../paths.js')

exports.command = 'check'

exports.describe = 'Checks commit messages according to standards.'

exports.builder = {
    commitlintConfig: {
        describe: 'Commitlint config file to use',
        type: 'string',
        default: COMMITLINT_CONFIG,
    },
}

exports.handler = function(argv) {
    const cmd = 'npx'
    const args = [
        '--no-install',
        'commitlint',
        `--config=${COMMITLINT_CONFIG}`,
        '--edit',
    ]

    run(cmd, args)
}
