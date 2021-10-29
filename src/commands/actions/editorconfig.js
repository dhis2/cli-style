const log = require('@dhis2/cli-helpers-engine').reporter
const cfg = require('../../utils/config.js')

exports.command = 'editorconfig [type]'

exports.desc = 'Add the editorconfig configuration to the project.'

exports.builder = (yargs) =>
    yargs
        .positional('type', {
            describe: 'Template to use for EditorConfig',
            type: 'string',
            default: 'base',
        })
        .option('overwrite', {
            describe: 'Overwrite the existing configuration.',
            type: 'boolean',
        })
        .example(
            '$0 add editorconfig',
            'Adds the standard configuration to .editorconfig'
        )

exports.handler = (argv) => {
    const { add, type, overwrite } = argv

    log.info(`editorconfig > ${add ? 'add' : 'remove'}`)

    if (add) {
        cfg.add({
            tool: 'editorconfig',
            type: type ? type : 'base',
            overwrite,
        })
    } else {
        cfg.remove({ tool: 'editorconfig', type: type ? type : 'base' })
    }
}
