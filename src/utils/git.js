const { dirExists } = require('./files.js')
const { GIT_DIR } = require('./paths.js')

exports.gitEnabled = () => dirExists(GIT_DIR)
