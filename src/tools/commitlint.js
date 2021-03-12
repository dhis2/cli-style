const { COMMITLINT_CONFIG } = require('../utils/paths.js')
const { bin } = require('../utils/run.js')

exports.commitlint = ({ config = COMMITLINT_CONFIG, file }) => {
    const cmd = 'commitlint'
    const args = [
        'commitlint',
        ...(config ? ['--config', config] : []),
        ...(file ? ['--edit', file] : []),
    ]

    bin(cmd, { args })
}
