const { run } = require('../utils/run.js')
const { COMMITLINT_CONFIG } = require('../utils/paths.js')

exports.commitlint = (config = COMMITLINT_CONFIG) => {
    const cmd = 'npx'
    const args = ['--no-install', 'commitlint', `--config=${config}`, '--edit']

    run(cmd, { args })
}
