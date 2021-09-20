const log = require('@dhis2/cli-helpers-engine').reporter
const cfg = require('../../utils/config.js')

exports.command = 'eslint [type]'

exports.desc = 'Add ESLint configuration to the project.'

exports.builder = (yargs) =>
    yargs
        .positional('type', {
            describe: 'Configuration template for ESLint.',
            type: 'string',
            choices: Object.keys(cfg.templateConfigs.eslint),
            default: 'base',
        })
        .option('overwrite', {
            describe: 'Overwrite the existing configuration.',
            type: 'boolean',
        })

exports.handler = (argv) => {
    const { add, type, overwrite } = argv

    log.info(`eslint > ${add ? 'add' : 'remove'}`)

    if (add) {
        cfg.add({
            tool: 'eslint',
            type,
            overwrite,
        })
    } else {
        cfg.remove({ tool: 'eslint', type })
    }
}
