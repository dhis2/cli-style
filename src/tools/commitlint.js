const { bin } = require('../utils/run.js')
const { COMMITLINT_CONFIG } = require('../utils/paths.js')

exports.commitlint = (config = COMMITLINT_CONFIG) => {
    const package = '@commitlint/cli'
    const bin = 'commitlint'
    const args = ['commitlint', `--config=${config}`, '--edit']

    bin(package, { bin, args })
}
