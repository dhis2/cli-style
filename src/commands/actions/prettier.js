const log = require('@dhis2/cli-helpers-engine').reporter
const cfg = require('../../utils/config.js')

exports.command = 'prettier [type]'

exports.desc = 'Add the Prettier configuration to the project.'

exports.builder = (yargs) =>
    yargs
        .positional('type', {
            describe: 'Configuration template to use for Prettier',
            type: 'string',
            default: 'base',
        })
        .option('overwrite', {
            describe: 'Overwrite the existing configuration.',
            type: 'boolean',
        })
        .example(
            '$0 add prettier',
            'Adds the standard configuration to .prettierrc.js'
        )

exports.handler = (argv) => {
    const { add, type, overwrite } = argv

    log.info(`prettier > ${add ? 'add' : 'remove'}`)

    if (add) {
        cfg.add({
            tool: 'prettier',
            type: type ? type : 'base',
            overwrite,
        })
    } else {
        cfg.remove({ tool: 'prettier', type: type ? type : 'base' })
    }
}
