const { jscmd } = require('./check.js')

exports.command = 'apply'

exports.describe = 'Automatically run the appropriate checks on files'

exports.builder = yargs =>
    jscmd(yargs)
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
