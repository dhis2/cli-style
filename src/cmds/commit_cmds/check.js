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
        log.info('Commit message is valid')
        process.exit(0)
    } else {
        log.error('Commit message is invalid')
        process.exit(1)
    }
}
