const log = require('@dhis2/cli-helpers-engine').reporter
const { callback, exit } = require('../utils/run.js')
const { jscmd } = require('./check.js')
const { handler: jsHandler } = require('./types/javascript.js')
const { handler: textHandler } = require('./types/structured-text.js')

const statusCode = callback()

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
