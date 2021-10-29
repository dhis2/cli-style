const log = require('@dhis2/cli-helpers-engine').reporter
const cfg = require('../../utils/config.js')

exports.command = 'ls-lint [type]'

exports.desc = 'Lint file and directory names.'

exports.builder = (yargs) =>
    yargs
        .positional('type', {
            describe: 'Configuration template to use for ls-lint',
            type: 'string',
            default: 'base',
        })
        .option('overwrite', {
            describe: 'Overwrite the existing configuration.',
            type: 'boolean',
        })
        .example(
            '$0 add ls-lint',
            'Adds the standard configuration to .ls-lint.yml'
        )

exports.handler = (argv) => {
    const { add, type, overwrite } = argv

    log.info(`ls-lint > ${add ? 'add' : 'remove'}`)

    if (add) {
        cfg.add({
            tool: 'lslint',
            type: type ? type : 'base',
            overwrite,
        })
    } else {
        cfg.remove({ tool: 'lslint', type: type ? type : 'base' })
    }
}
