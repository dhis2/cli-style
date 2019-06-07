const log = require('@dhis2/cli-helpers-engine').reporter

const { configure } = require('../config')

exports.command = 'setup [groups..]'

exports.describe = 'Setup DHIS2 configurations for a/all group(s)'

exports.builder = {
    init: {
        describe: 'Overwrites existing configuration',
        type: 'boolean',
        default: 'false',
    },
}

exports.handler = argv => {
    log.info('Setting up configuration files...')
    const { init, groups } = argv

    const root = process.cwd()

    configure(root, groups, init)
}
