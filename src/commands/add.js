exports.command = 'add'

exports.describe = ''

exports.builder = yargs =>
    yargs.commandDir('actions').config({
        add: true,
    })
