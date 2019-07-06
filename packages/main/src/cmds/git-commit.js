const { namespace } = require('@dhis2/cli-helpers-engine')

const command = namespace('commit', {
    describe: 'Format commit messages according to standards.',
    builder: yargs => {
        return yargs.commandDir('commit_cmds')
    },
})

module.exports = command
