const { bin } = require('@dhis2/cli-helpers-engine').exec
const { packageConfigs } = require('../utils/config.js')
const { PACKAGE_ROOT } = require('../utils/paths.js')

exports.commitlint = ({
    config = packageConfigs.commitlint,
    file,
    callback,
}) => {
    const cmd = 'commitlint'
    const cwd = PACKAGE_ROOT
    const args = [
        'commitlint',
        ...(config ? ['--config', config] : []),
        ...(file ? ['--edit', file] : []),
    ]

    bin(cmd, { args, cwd }, callback)
}
