const log = require('@dhis2/cli-helpers-engine').reporter
const { lslint } = require('../../tools/ls-lint.js')
const { callback: runCb, exit } = require('../../utils/run.js')

exports.command = 'fs'
exports.aliases = ['file-system']
exports.desc = 'Lint file and directory names.'

exports.builder = yargs => yargs

exports.handler = (argv, callback) => {
    const finalStatus = callback || runCb()

    log.info('file-system > ls-lint')
    lslint({
        callback: finalStatus,
    })

    if (finalStatus() === 0) {
        log.print('All matched files pass the lint rules.')
        log.print('')
    }

    if (!callback) {
        log.debug('Linted files in project.')
        exit(finalStatus())
    }

    return finalStatus()
}
