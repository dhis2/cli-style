const log = require('@dhis2/cli-helpers-engine').reporter
const { callback } = require('@dhis2/cli-helpers-engine').exec
const { exit } = require('@dhis2/cli-helpers-engine')
const { commitlint } = require('../../tools/commitlint.js')
const { gitEnabled } = require('../../utils/git.js')
const { CONSUMING_ROOT } = require('../../utils/paths.js')

const statusCode = callback()

exports.command = 'commit [file]'

exports.desc = 'Commit message validations.'

exports.builder = (yargs) =>
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

exports.handler = (argv) => {
    log.info(`commit-msg > commitlint`)

    if (!gitEnabled()) {
        log.print('Not a Git repository, skipping commit validation.')
        return
    }

    commitlint({
        config: argv.commitlintConfig,
        file: argv.file,
        callback: statusCode,
    })
    if (statusCode() === 0) {
        log.print('The commit message is conventional.')
    }
    exit(statusCode())
}
