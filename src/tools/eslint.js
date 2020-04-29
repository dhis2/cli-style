const { bin } = require('../utils/run.js')
const { resolveIgnoreFile } = require('../utils/files.js')

exports.eslint = ({ files = [], apply = false, config }) => {
    const ignoreFile = resolveIgnoreFile(['.eslintignore'])
    const cmd = 'eslint'
    const args = [
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

    bin(cmd, { args })
}
