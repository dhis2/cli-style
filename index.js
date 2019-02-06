const { namespace } = require('@dhis2/cli-helpers-engine')

const command = namespace('style', {
    desc: 'DHIS2 programmatic style for commit msgs/code',
    aliases: 's',
    builder: require('./src/cmds.js'),
})

module.exports = command
