const log = require('@dhis2/cli-helpers-engine').reporter
const cfg = require('../../utils/config.js')

exports.command = 'renovate [type]'

exports.desc = 'Lint file and directory names.'

exports.builder = (yargs) =>
    yargs
        .positional('type', {
            describe: 'Configuration template to use for Renovate',
            type: 'string',
            default: 'base',
        })
        .option('overwrite', {
            describe: 'Overwrite the existing configuration.',
            type: 'boolean',
        })
        .example(
            '$0 add renovate',
            'Adds the standard configuration to renovate.json'
        )

exports.handler = (argv) => {
    const { add, type, overwrite } = argv

    log.info(`renovate > ${add ? 'add' : 'remove'}`)

    if (add) {
        cfg.add({
            tool: 'renovate',
            type: type ? type : 'base',
            overwrite,
        })
    } else {
        cfg.remove({ tool: 'renovate', type: type ? type : 'base' })
    }
}
