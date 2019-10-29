const log = require('@dhis2/cli-helpers-engine').reporter

const { run } = require('../run.js')
const { COMMITLINT_CONFIG } = require('../paths.js')

exports.commitlint = (config = COMMITLINT_CONFIG) => {
    const cmd = 'npx'
    const args = ['--no-install', 'commitlint', `--config=${config}`, '--edit']

    run(cmd, args)
}
