const log = require('@dhis2/cli-helpers-engine').reporter

exports.command = 'apply [type]'

exports.describe = 'Automatically run the appropriate checks on files'

exports.builder = yargs =>
    yargs
        .commandDir('types')
        .option('staged', {
            describe: 'Only check staged files in Git',
            type: 'boolean',
            default: false,
        })
        .config({
            apply: true,
        })

exports.handler = argv => {}
