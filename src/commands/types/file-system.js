const log = require('@dhis2/cli-helpers-engine').reporter
const { callback: runCb } = require('@dhis2/cli-helpers-engine').exec
const { exit } = require('@dhis2/cli-helpers-engine')
const { lslint } = require('../../tools/ls-lint.js')
const { configured } = require('../../utils/config.js')

exports.command = 'fs'
exports.aliases = ['file-system']
exports.desc = 'Lint file and directory names.'

exports.builder = (yargs) => yargs

exports.handler = (argv, callback) => {
    const finalStatus = callback || runCb()

    if (configured('lslint')) {
        log.info('file-system > ls-lint')

        lslint({
            callback: finalStatus,
        })

        if (finalStatus() === 0) {
            log.print('All matched files pass the lint rules.')
            log.print('')
        }
    } else {
        log.log('No ls-lint configuration found')
    }

    if (!callback) {
        log.debug('Linted files in project.')
        exit(finalStatus())
    }

    return finalStatus()
}
