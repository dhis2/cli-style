const log = require('@dhis2/cli-helpers-engine').reporter

const { PRETTIER_CONFIG, ESLINT_CONFIG } = require('../../paths.js')
const { run } = require('../../run.js')

exports.command = 'check [files..]'

exports.describe = 'Check JS format.'

exports.builder = {
    prettierConfig: {
        describe: 'Prettier config file to use',
        type: 'string',
        default: PRETTIER_CONFIG,
    },
    eslintConfig: {
        describe: 'ESLint config file to use',
        type: 'string',
        default: ESLINT_CONFIG,
    },
}

exports.handler = argv => {
    const { files } = argv

    const cmd = 'npx'
    const args = [
        '--no-install',
        'commitlint',
        `--config=${COMMITLINT_CONFIG}`,
        '--edit',
    ]

    run(cmd, args)
}
