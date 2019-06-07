const log = require('@dhis2/cli-helpers-engine').reporter

const { configure } = require('../config')

exports.command = 'setup [group..]'

exports.describe = 'Setup DHIS2 configurations for a/all group(s)'

exports.builder = {
    force: {
        describe: 'Overwrites existing configuration',
        type: 'boolean',
        default: 'false',
    },
}

exports.handler = argv => {
    log.info('Setting up configuration files...')
    const { force, group } = argv

    const root = process.cwd()

    configure(root, group, force)
}
