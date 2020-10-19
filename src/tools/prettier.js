const log = require('@dhis2/cli-helpers-engine').reporter

const { resolveIgnoreFile } = require('../utils/files.js')
const { bin } = require('../utils/run.js')

exports.prettier = ({ files = [], apply = false, config }) => {
    const ignoreFile = resolveIgnoreFile(['.prettierignore'])
    const cmd = 'prettier'
    const args = [
        '--list-different',
        ...(config ? ['--config', config] : []),
        ...(ignoreFile ? ['--ignore-path', ignoreFile] : []),
        ...(apply ? ['--write'] : []),
        ...files,
    ]

    bin(cmd, { args }, ({ status }) => {
        if (status === 1 && !apply) {
            log.warn(`Code style issues found in the above file(s).`)
        }

        if (status === 2) {
            log.info(
                'Internal error in Prettier, run with "--verbose" for more information.'
            )
        }
    })
}
