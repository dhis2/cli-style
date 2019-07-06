const { configure, cleanup } = require('../../config')

exports.command = 'install'
exports.describe =
    'Install javascript tool configurations for use by IDE plugins'
exports.handler = () => {
    const root = process.cwd()
    cleanup(root)
    configure(root, 'js', true)
}
