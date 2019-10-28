const { bundledConfigPaths } = require('./src/utils/groups.js')
const command = require('./src/index.js')

exports.config = bundledConfigPaths()
exports.command = command
