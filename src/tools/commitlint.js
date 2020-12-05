const { bin } = require('../utils/run.js')
const { COMMITLINT_CONFIG } = require('../utils/paths.js')

exports.commitlint = (config = COMMITLINT_CONFIG) => {
    const packageName = '@commitlint/cli'
    const cmd = 'commitlint'
    const args = ['commitlint', `--config=${config}`, '--edit']

    bin(packageName, { bin: cmd, args })
}
