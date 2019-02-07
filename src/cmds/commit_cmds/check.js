const log = require('@dhis2/cli-helpers-engine').reporter
const fmt = require('../../commitlint.js')

exports.command = 'check [commitmsg]'

exports.describe = 'Checks commit messages according to standards.'

exports.builder = {}

exports.handler = async function(argv) {
    const { commitmsg } = argv

    const report = await fmt(commitmsg)

    if (report.valid) {
        log.info('Commit message is valid')
    } else {
        log.error('Commit message is invalid')
    }
}
