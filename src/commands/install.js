const log = require('@dhis2/cli-helpers-engine').reporter
const { husky } = require('../tools/husky.js')

exports.command = 'install [group..]'

exports.describe = 'Install DHIS2 configurations'

exports.builder = yargs =>
    yargs.positional('group', {
        describe: '',
        type: 'string',
    })

exports.handler = async argv => {
    const { group } = argv

    if (group.length === 0) {
        log.info('git-hooks > husky')
        husky({
            command: 'install',
        })
    } else {
        log.warn('yowza')
    }
}
