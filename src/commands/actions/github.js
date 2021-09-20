const log = require('@dhis2/cli-helpers-engine').reporter
const cfg = require('../../utils/config.js')

exports.command = 'github <type>'

exports.desc = 'Add configuration files for GitHub'

exports.builder = (yargs) =>
    yargs
        .positional('type', {
            describe: 'Template to use for GitHub configuration',
            type: 'string',
            choices: Object.keys(cfg.templateConfigs.github),
        })
        .option('overwrite', {
            describe: 'Overwrite the existing configuration.',
            type: 'boolean',
        })
        .example(
            '$0 add github workflow-node',
            'Adds the GitHub Workflow template for NodeJS projects'
        )
        .example(
            '$0 add github dependabot',
            'Adds the configuration file for Dependabot with DHIS2 defaults'
        )

exports.handler = (argv) => {
    const { add, type, overwrite, getCache } = argv

    log.info(`github > ${add ? 'add' : 'remove'}`)

    if (add) {
        cfg.add({
            tool: 'github',
            type,
            cache: getCache(),
            overwrite,
        })
    } else {
        cfg.remove({ tool: 'github', type })
    }
}
