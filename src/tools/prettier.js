const { bin } = require('@dhis2/cli-helpers-engine').exec
const { resolveIgnoreFile } = require('../utils/files.js')
const { PACKAGE_ROOT } = require('../utils/paths.js')

exports.prettier = ({ files = [], apply = false, config, callback }) => {
    const ignoreFile = resolveIgnoreFile(['.prettierignore'])
    const cmd = 'prettier'
    const cwd = PACKAGE_ROOT
    const args = [
        '--check',
        ...(config ? ['--config', config] : []),
        ...(ignoreFile ? ['--ignore-path', ignoreFile] : []),
        ...(apply ? ['--write'] : []),
        ...files,
    ]

    bin(cmd, { args, cwd }, callback)
}
