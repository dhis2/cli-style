const { bin } = require('@dhis2/cli-helpers-engine').exec
const { resolveIgnoreFile } = require('../utils/files.js')
const { PACKAGE_ROOT } = require('../utils/paths.js')

exports.eslint = ({ files = [], apply = false, config, callback }) => {
    const ignoreFile = resolveIgnoreFile(['.eslintignore'])
    const cmd = 'eslint'
    const cwd = PACKAGE_ROOT
    const args = [
        '--report-unused-disable-directives',
        '--ignore',
        '--format=stylish',
        `--resolve-plugins-relative-to=${PACKAGE_ROOT}`,
        ...(ignoreFile ? ['--ignore-path', ignoreFile] : []),
        ...(config ? ['--config', config] : []),
        ...(apply ? ['--fix'] : []),
        ...files,
    ]

    bin(cmd, { args, cwd }, callback)
}
