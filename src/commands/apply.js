/*
 * To avoid duplicating the handler, we re-use the check handler in the
 * apply command.
 */
const { jscmd } = require('./check.js')

exports.command = 'apply'

exports.describe =
    'Apply code format and fix all lint issues that can be resolved automatically.'

exports.builder = (yargs) =>
    jscmd(yargs)
        /*
         * Only list the types that can be automatically fixed here.
         */
        .command(require('./types/javascript.js'))
        .command(require('./types/structured-text.js'))

        .option('staged', {
            describe: 'Only check staged files in Git',
            type: 'boolean',
            default: false,
        })
        .config({
            apply: true,
        })
        .example(
            '$0 apply',
            'Finds and applies code format and lint fixes to all supported, or configured, file formats.'
        )
        .example(
            '$0 apply js',
            'Applies code format and lint fixes to JavaScript files.'
        )
        .example(
            '$0 apply text --staged',
            'Only match files that are staged in Git.'
        )
