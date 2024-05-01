const { bin } = require('@dhis2/cli-helpers-engine').exec
const { PACKAGE_ROOT } = require('../utils/paths.js')

exports.stylelint = ({ files = [], apply = false, callback }) => {
    const cmd = 'stylelint'
    const cwd = PACKAGE_ROOT
    const args = [
        ...(apply ? ['--fix'] : []),
        ...files,
    ]

    bin(cmd, { args, cwd }, callback)
}
