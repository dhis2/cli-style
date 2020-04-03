const { run } = require('../utils/run.js')
const { resolveIgnoreFile } = require('../utils/files.js')
const { cmd } = require('../utils/cmd.js')

exports.eslint = ({ files = [], apply = false, config }) => {
    const ignoreFile = resolveIgnoreFile(['.eslintignore'])
    const args = [
        'eslint',
        '--no-color',
        '--report-unused-disable-directives',
        '--ignore',
        '--quiet',
        '--format=unix',
        ...(ignoreFile ? ['--ignore-path', ignoreFile] : []),
        ...(config ? ['--config', config] : []),
        ...(apply ? ['--fix'] : []),
        ...files,
    ]

    run(cmd, { args })
}
