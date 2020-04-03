const { run } = require('../utils/run.js')
const { cmd } = require('../utils/cmd.js')
const { COMMITLINT_CONFIG } = require('../utils/paths.js')

exports.commitlint = (config = COMMITLINT_CONFIG) => {
    const args = ['commitlint', `--config=${config}`, '--edit']

    run(cmd, { args })
}
