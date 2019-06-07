const log = require('@dhis2/cli-helpers-engine').reporter

const { configure } = require('../config')

exports.command = 'setup [group]'

exports.describe = 'Setup DHIS2 configurations for a/all group(s)'

exports.builder = {
    init: {
        describe: 'Overwrites existing configuration',
        type: 'boolean',
        default: 'false',
    },
}

exports.handler = argv => {
    const { init, group } = argv

    const root = process.cwd()

    configure(root, group, init)
}
