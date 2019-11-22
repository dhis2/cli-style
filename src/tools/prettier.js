const { run } = require('../utils/run.js')
const log = require('@dhis2/cli-helpers-engine').reporter

exports.prettier = ({ files = [], apply = false, config, type }) => {
    const cmd = 'npx'
    const args = [
        '--no-install',
        'prettier',
        '--list-different',
        ...(config ? ['--config', config] : []),
        ...(apply ? ['--write'] : []),
        ...files,
    ]

    run(cmd, { args }, ({ status }) => {
        if (status === 1 && !apply) {
            log.warn(
                `Code style issues found in the above file(s). Run "d2-style ${type} apply" to fix.`
            )
        }

        if (status === 2) {
            log.info(
                'Internal error in Prettier, run with "--verbose" for more information.'
            )
        }
    })
}
