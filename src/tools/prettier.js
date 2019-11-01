const log = require('@dhis2/cli-helpers-engine').reporter

const { run } = require('../utils/run.js')

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
