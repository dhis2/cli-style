const { resolveIgnoreFile } = require('../utils/files.js')
const { bin } = require('../utils/run.js')

exports.prettier = ({ files = [], apply = false, config, callback }) => {
    const ignoreFile = resolveIgnoreFile(['.prettierignore'])
    const cmd = 'prettier'
    const args = [
        '--check',
        ...(config ? ['--config', config] : []),
        ...(ignoreFile ? ['--ignore-path', ignoreFile] : []),
        ...(apply ? ['--write'] : []),
        ...files,
    ]

    bin(cmd, { args }, callback)
}
