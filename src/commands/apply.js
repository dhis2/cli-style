const log = require('@dhis2/cli-helpers-engine').reporter
const { handler } = require('./helpers.js')

exports.command = 'apply [types..]'

exports.describe = 'Automatically apply code style where possible.'

exports.builder = yargs =>
    yargs
        .positional('types..', {
            describe: '',
            type: 'string',
        })
        .option('files..', {
            describe: '',
            type: 'string',
        })
        .option('staged', {
            describe: 'Only check staged files in Git',
            type: 'boolean',
            default: false,
        })

exports.handler = argv => {
    log.info('d2-style > apply')

    handler(argv, true)
}
