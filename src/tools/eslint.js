const { run } = require('../utils/run.js')
const { resolveIgnoreFile } = require('../utils/files.js')

exports.eslint = ({ files = [], apply = false, config }) => {
    const ignoreFile = resolveIgnoreFile(['.eslintignore'])
    const cmd = 'npx'
    const args = [
        '--no-install',
        'eslint',
        '--no-color',
        '--report-unused-disable-directives',
        '--ignore',
        ...(ignoreFile ? ['--ignore-path', ignoreFile] : []),
        ...(config ? ['--config', config] : []),
        ...(apply ? ['--fix'] : []),
        ...files,
    ]

    run(cmd, { args })
}
