const { bin } = require('@dhis2/cli-helpers-engine').exec
const { PROJECT_ROOT } = require('../utils/paths.js')

exports.typescriptCheck = ({ callback }) => {
    const cmd = 'tsc'

    bin(cmd, { args: ['--noEmit'], PROJECT_ROOT }, callback)
}
