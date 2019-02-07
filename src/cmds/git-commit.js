exports.command = 'commit <cmd>'

exports.describe = 'Format commit messages according to standards.'

exports.builder = yargs => {
    return yargs.commandDir('commit_cmds')
}

exports.handler = argv => {}
