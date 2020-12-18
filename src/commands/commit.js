const log = require('@dhis2/cli-helpers-engine').reporter
const { namespace } = require('@dhis2/cli-helpers-engine')
const { commitlint } = require('../tools/commitlint.js')
const { CONSUMING_ROOT } = require('../utils/paths.js')

const commitCmd = yargs => {
    return yargs.command(
        'check [file]',
        'Checks commit messages according to standard.',
        function builder(yargs) {
            return yargs
                .positional('file', {
                    describe: 'File that contains the commit message',
                    type: 'string',
                    default: `${CONSUMING_ROOT}/.git/COMMIT_EDITMSG`,
                })
                .option('commitlintConfig', {
                    describe: 'Commitlint config file to use',
                    type: 'string',
                })
        },
        function handler(argv) {
            log.info('d2-style > commit')
            commitlint({
                config: argv.commitlintConfig,
                file: argv.file,
            })
        }
    )
}

module.exports = namespace('commit', {
    describe: 'Check commit messages according to standards.',
    builder: yargs => commitCmd(yargs),
})
