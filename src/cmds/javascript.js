exports.command = 'js'

exports.describe = 'Format javascript according to standards'

exports.builder = yargs => {
    return yargs.commandDir('js_cmds')
}

exports.handler = argv => {}
