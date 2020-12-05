const { bin } = require('../utils/run.js')
const { resolveIgnoreFile } = require('../utils/files.js')
const { PACKAGE_ROOT } = require('../utils/paths.js')

exports.eslint = ({ files = [], apply = false, config }) => {
    const ignoreFile = resolveIgnoreFile(['.eslintignore'])
    const packageName = 'eslint'
    const args = [
        '--no-color',
        '--report-unused-disable-directives',
        '--ignore',
        '--quiet',
        '--format=unix',
        `--resolve-plugins-relative-to=${PACKAGE_ROOT}`,
        ...(ignoreFile ? ['--ignore-path', ignoreFile] : []),
        ...(config ? ['--config', config] : []),
        ...(apply ? ['--fix'] : []),
        ...files,
    ]

    bin(packageName, { args })
}
