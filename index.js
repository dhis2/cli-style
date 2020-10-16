const command = require('./src/index.js')
const { bundledConfigPaths } = require('./src/utils/groups.js')

exports.config = bundledConfigPaths()
exports.command = command
