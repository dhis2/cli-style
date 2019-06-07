const { execSync } = require('child_process')

const log = require('@dhis2/cli-helpers-engine').reporter

const commitlint = require('./commitlint.js')

exports.runner = async function(msg) {
    const { result, report } = await commitlint(msg)

    return {
        name: 'git',
        summarize: () => log.print(result),
        hasViolations: report.valid,
    }
}
