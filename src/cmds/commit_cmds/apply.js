const log = require('@dhis2/cli-helpers-engine').reporter

const fmt = require('../../commitlint.js')

exports.command = 'apply'

exports.describe = 'Format commit messages according to standards.'

exports.builder = {}

exports.handler = async function(argv) {
    const report = await fmt()

    if (report.valid) {
        process.exit(0)
    } else {
        process.exit(1)
    }
}
