const log = require('@dhis2/cli-helpers-engine').reporter
const cfg = require('../../utils/config.js')

exports.command = 'eslint [type]'

exports.desc = ''

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
        .example('$0', 'Adds the standard ESLint configuration to .eslintrc.js')

exports.handler = argv => {
    const { add, type, overwrite } = argv

    log.info(`eslint > ${add ? 'add' : 'remove'}`)

    if (add) {
        const template = type ? type : 'base'
        cfg.add({
            tool: 'eslint',
            template,
            overwrite,
        })
    } else {
        cfg.remove({ tool: 'eslint', type })
    }
}
