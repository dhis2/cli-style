const { jscmd } = require('./check.js')

exports.command = 'apply'

exports.describe = 'Automatically run the appropriate checks on files'

exports.builder = yargs =>
    jscmd(yargs)
        .commandDir('types')
        .option('staged', {
            describe: 'Only check staged files in Git',
            type: 'boolean',
            default: false,
        })
        .config({
            apply: true,
        })
