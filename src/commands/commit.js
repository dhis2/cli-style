const log = require('@dhis2/cli-helpers-engine').reporter
const { namespace } = require('@dhis2/cli-helpers-engine')
const { commitlint } = require('../tools/commitlint.js')

const commitCmd = yargs => {
    return yargs.command(
        'check',
        'Checks commit messages according to standards.',
        function builder(yargs) {
            return yargs.option('commitlintConfig', {
                describe: 'Commitlint config file to use',
                type: 'string',
            })
        },
        function handler(argv) {
            log.info('d2-style > commit')
            commitlint(argv.commitlintConfig)
        }
    )
}

module.exports = namespace('commit', {
    describe: 'Format commit messages according to standards.',
    builder: yargs => commitCmd(yargs),
})
