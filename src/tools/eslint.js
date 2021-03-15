const { resolveIgnoreFile } = require('../utils/files.js')
const { PACKAGE_ROOT } = require('../utils/paths.js')
const { bin } = require('../utils/run.js')

exports.eslint = ({ files = [], apply = false, config }) => {
    const ignoreFile = resolveIgnoreFile(['.eslintignore'])
    const cmd = 'eslint'
    const args = [
        '--no-color',
        '--report-unused-disable-directives',
        '--ignore',
        '--format=unix',
        `--resolve-plugins-relative-to=${PACKAGE_ROOT}`,
        ...(ignoreFile ? ['--ignore-path', ignoreFile] : []),
        ...(config ? ['--config', config] : []),
        ...(apply ? ['--fix'] : []),
        ...files,
    ]

    bin(cmd, { args })
}
