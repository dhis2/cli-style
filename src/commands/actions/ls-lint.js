const log = require('@dhis2/cli-helpers-engine').reporter
const cfg = require('../../utils/config.js')

exports.command = 'ls-lint [type]'

exports.desc = 'Lint file and directory names.'

exports.builder = yargs =>
    yargs
        .positional('type', {
            describe: '',
            type: 'string',
        })
        .option('overwrite', {
            describe: '',
            type: 'boolean',
        })
        .example('$0', 'Adds the standard configuration to .ls-lint.yml')

exports.handler = argv => {
    const { add, type, overwrite } = argv

    log.info(`ls-lint > ${add ? 'add' : 'remove'}`)

    if (add) {
        const template = type ? type : 'base'
        cfg.add({
            tool: 'lslint',
            template,
            overwrite,
        })
    } else {
        cfg.remove({ tool: 'lslint', type })
    }
}
