const { namespace } = require('@dhis2/cli-helpers-engine')
const log = require('@dhis2/cli-helpers-engine').reporter
const { prettier } = require('../../tools/prettier.js')
const { selectFiles } = require('../../utils/files.js')
const { callback: runCb, exit } = require('../../utils/run.js')
const {
    sayFilesChecked,
    sayNoFiles,
    sayStatusCode,
} = require('../../utils/std-log-messages.js')

exports.command = 'text [files..]'
exports.aliases = ['structured-text']
exports.desc = 'Structured text style'
exports.builder = yargs =>
    yargs.positional('files', {
        describe: '',
        type: 'string',
    })

exports.handler = (argv, callback) => {
    if (!argv.patterns || (argv.patterns && !argv.patterns.text)) {
        log.warn(
            'No text patterns defined, please check the configuration file'
        )
        process.exit(1)
    }

    const finalStatus = callback || runCb()

    const {
        patterns: { text: textPattern },
        files,
        staged,
        apply,
    } = argv

    const textFiles = selectFiles(files, textPattern, staged)
    if (textFiles.length === 0) {
        log.warn(sayNoFiles('structured text', textPattern, staged))
        return
    }

    log.debug(`Linting files: ${textFiles.join(', ')}`)

    log.info('structured-text > prettier')
    prettier({
        apply,
        files: textFiles,
        callback: finalStatus,
    })

    if (!callback) {
        log.info(sayFilesChecked('text', textFiles.length, apply))
        exit(finalStatus())
    }

    return textFiles.length
}
