const { bin } = require('../utils/run.js')
const { COMMITLINT_CONFIG } = require('../utils/paths.js')

exports.commitlint = ({ config = COMMITLINT_CONFIG, file }) => {
    const cmd = 'commitlint'
    const args = [
        'commitlint',
        `--config=${config}`,
        '--edit',
        ...(file ? [file] : []),
    ]

    bin(cmd, { args })
}
