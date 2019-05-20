const { namespace } = require('@dhis2/cli-helpers-engine')

const command = namespace('package', {
    aliases: ['p'],
    describe: 'Validate package.json for DHIS2 apps/libs',
    builder: yargs => {
        return yargs.commandDir('package_cmds')
    },
})

module.exports = command
