const configure = require('../../config')

exports.command = 'install'
exports.describe =
    'Install javascript tool configurations for use by IDE plugins'
exports.handler = () => {
    configure(process.cwd())
}
