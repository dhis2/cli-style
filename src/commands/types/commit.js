const log = require('@dhis2/cli-helpers-engine').reporter
const { commitlint } = require('../../tools/commitlint.js')
const { CONSUMING_ROOT } = require('../../utils/paths.js')
const { callback, exit } = require('../../utils/run.js')

const statusCode = callback()

exports.command = 'commit [file]'

exports.desc = ''

exports.builder = yargs =>
    yargs
        .positional('file', {
            describe: 'File that contains the commit message',
            type: 'string',
            default: `${CONSUMING_ROOT}/.git/COMMIT_EDITMSG`,
        })
        .option('commitlintConfig', {
            describe: 'Commitlint config file to use',
            type: 'string',
        })

exports.handler = argv => {
    log.info(`commit-msg > commitlint`)
    commitlint({
        config: argv.commitlintConfig,
        file: argv.file,
        callback: statusCode,
    })
    exit(statusCode())
}
