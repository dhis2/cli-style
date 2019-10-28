const log = require('@dhis2/cli-helpers-engine').reporter

const { run } = require('../../run.js')

exports.prettier = ({ files = [], apply = false, config }) => {
    const cmd = 'npx'
    const args = [
        '--no-install',
        'prettier',
        ...(config ? ['--config', config] : []),
        ...(apply ? ['--write'] : ['--check']),
        ...files,
    ]

    run(cmd, args)
}

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
