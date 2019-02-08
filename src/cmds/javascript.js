const { namespace } = require('@dhis2/cli-helpers-engine')

const command = namespace('javascript', {
    aliases: ['js'],
    describe: 'Format javascript according to standards',
    builder: yargs => {
        return yargs.commandDir('js_cmds')
    },
})

module.exports = command
