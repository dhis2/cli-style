exports.command = 'remove'

exports.describe = ''

exports.builder = yargs =>
    yargs.commandDir('actions').config({
        add: false,
    })
