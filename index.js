const { configObject } = require('./src/groups.js')
const command = require('./src/index.js')

exports.config = configObject()
exports.command = command
