const log = require('@dhis2/cli-helpers-engine').reporter
const cfg = require('../../utils/config.js')

exports.command = 'stylelint [type]'

exports.desc = 'Add Stylelint configuration to the project.'

exports.builder = (yargs) =>
    yargs
        .positional('type', {
            describe: 'Configuration template for Stylelint.',
            type: 'string',
            default: 'base',
        })
        .option('overwrite', {
            describe: 'Overwrite the existing configuration.',
            type: 'boolean',
        })

exports.handler = (argv) => {
    const { add, type, overwrite } = argv

    log.info(`stylelint > ${add ? 'add' : 'remove'}`)

    if (add) {
        cfg.add({
            tool: 'stylelint',
            type: type ? type : 'base',
            overwrite,
        })
    } else {
        cfg.remove({ tool: 'stylelint', type: type ? type : 'base' })
    }
}
