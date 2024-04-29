const { bin } = require('@dhis2/cli-helpers-engine').exec
const { PACKAGE_ROOT } = require('../utils/paths.js')

exports.stylelint = ({ callback }) => {
    const cmd = 'stylelint'
    const cwd = PACKAGE_ROOT
    const args = []

    bin(cmd, { args, cwd }, callback)
}
