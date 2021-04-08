const { bin } = require('../utils/run.js')

exports.lslint = ({ callback }) => {
    const cmd = 'ls-lint'
    const args = []

    bin(cmd, { args }, callback)
}
