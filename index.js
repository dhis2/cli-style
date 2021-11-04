const command = require('./src/index.js')
const { packageConfigs } = require('./src/utils/config.js')

exports.config = packageConfigs
exports.command = command
