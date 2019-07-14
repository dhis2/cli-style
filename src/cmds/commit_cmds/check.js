const log = require('@dhis2/cli-helpers-engine').reporter
const { runner } = require('../../tools/git')

exports.command = 'check [msg]'

exports.describe = 'Checks commit messages according to standards.'

exports.builder = {}

exports.handler = async function(argv) {
    const { msg } = argv

    const report = await runner(msg)

    report.summarize()

    if (report.hasViolations) {
        log.debug('Commit message is valid')
        process.exit(0)
    } else {
        log.debug('Commit message is invalid')
        process.exit(1)
    }
}
