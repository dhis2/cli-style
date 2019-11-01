const log = require('@dhis2/cli-helpers-engine').reporter

const { run } = require('../utils/run.js')

exports.eslint = ({ files = [], apply = false, config }) => {
    const cmd = 'npx'
    const args = [
        '--no-install',
        'eslint',
        '--no-color',
        '--ignore',
        '--report-unused-disable-directives',
        ...(config ? ['--config', config] : []),
        ...(apply ? ['--fix'] : []),
        ...files,
    ]

    run(cmd, args)
}
