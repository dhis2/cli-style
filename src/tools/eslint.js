const { run } = require('../utils/run.js')

exports.eslint = ({ files = [], apply = false, config }) => {
    const cmd = 'npx'
    const args = [
        '--no-install',
        'eslint',
        '--no-color',
        '--report-unused-disable-directives',
        '--ignore',
        ...(config ? ['--config', config] : []),
        ...(apply ? ['--fix'] : []),
        ...files,
    ]

    run(cmd, { args })
}
