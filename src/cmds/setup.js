const log = require('@dhis2/cli-helpers-engine').reporter

const { configure } = require('../config.js')
const { printGroups } = require('../groups.js')
const { lefthook } = require('../tools/lefthook.js')

exports.command = 'setup [group..]'

exports.describe = 'Setup DHIS2 configurations for a/all group(s)'

exports.builder = {
    force: {
        describe: 'Overwrites existing configuration',
        type: 'boolean',
        default: 'false',
    },
    listGroups: {
        describe: 'List available groups',
        type: 'boolean',
        default: 'false',
    },
}

exports.handler = argv => {
    if (argv.listGroups) {
        log.print(printGroups())
        process.exit(0)
    }

    const { force, group } = argv

    const root = process.cwd()

    configure(root, group, force)

    log.info('Refreshing Git hooks...')
    lefthook({
        command: 'install',
    })
}
