const { packageConfigs } = require('../utils/config.js')
const { bin } = require('../utils/run.js')

exports.commitlint = ({
    config = packageConfigs.commitlint,
    file,
    callback,
}) => {
    const cmd = 'commitlint'
    const args = [
        'commitlint',
        ...(config ? ['--config', config] : []),
        ...(file ? ['--edit', file] : []),
    ]

    bin(cmd, { args }, callback)
}
