const log = require('@dhis2/cli-helpers-engine').reporter
const { callback, exit } = require('../utils/run.js')
const { handler: jsHandler } = require('./types/javascript.js')
const { handler: textHandler } = require('./types/structured-text.js')

const statusCode = callback()

exports.jscmd = yargs =>
    yargs.command(
        '$0 [files..]',
        'default',
        yargs =>
            yargs.positional('files', {
                describe: '',
                type: 'string',
            }),
        argv => {
            if (!argv.config.patterns) {
                log.warn(
                    'No patterns defined, please check the configuration file'
                )
                process.exit(1)
            }

            if (argv.config.patterns.js) {
                jsHandler(argv, statusCode)
                log.print('')
            }

            if (argv.config.patterns.text) {
                textHandler(argv, statusCode)
            }

            exit(statusCode())
        }
    )

exports.command = 'check'

exports.describe = 'Automatically run the appropriate checks on files'

exports.builder = yargs =>
    this.jscmd(yargs)
        .command(require('./types/javascript.js'))
        .command(require('./types/structured-text.js'))
        .command(require('./types/commit.js'))
        .option('staged', {
            describe: 'Only check staged files in Git',
            type: 'boolean',
            default: false,
        })
        .config({
            apply: false,
        })
        .example(
            '$0 check',
            'Finds and checks code for formatting and lint issues, for all supported, or configured, file formats.'
        )
        .example(
            '$0 check js',
            'Checks code format and lint issues to JavaScript files.'
        )
        .example(
            '$0 check text --staged',
            'Only match files that are staged in Git.'
        )
