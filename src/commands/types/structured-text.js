const log = require('@dhis2/cli-helpers-engine').reporter
const { callback: runCb } = require('@dhis2/cli-helpers-engine').exec
const { exit } = require('@dhis2/cli-helpers-engine')
const { prettier } = require('../../tools/prettier.js')
const { configured } = require('../../utils/config.js')
const { selectFiles } = require('../../utils/files.js')
const {
    sayFilesChecked,
    sayNoFiles,
} = require('../../utils/std-log-messages.js')

exports.command = 'text [files..]'
exports.aliases = ['structured-text']
exports.desc = 'Structured text style'
exports.builder = (yargs) =>
    yargs.positional('files', {
        describe: '',
        type: 'string',
    })

exports.handler = (argv, callback) => {
    if (
        !argv.config.patterns ||
        (argv.config.patterns && !argv.config.patterns.text)
    ) {
        log.warn(
            'No text patterns defined, please check the configuration file'
        )
        exit(1)
    }

    const finalStatus = callback || runCb()

    const {
        config: {
            patterns: { text: textPattern },
        },
        files,
        staged,
        apply,
    } = argv

    const textFiles = selectFiles(files, textPattern, staged)
    if (textFiles.length === 0) {
        log.debug(sayNoFiles('structured text', textPattern, staged))
        return
    }

    log.debug(`Linting files: ${textFiles.join(', ')}`)

    if (configured('prettier')) {
        log.info('structured-text > prettier')
        prettier({
            apply,
            files: textFiles,
            callback: finalStatus,
        })
    } else {
        log.log('No Prettier configuration found')
    }

    if (!callback) {
        log.debug(sayFilesChecked('text', textFiles.length, apply))
        exit(finalStatus())
    }

    return textFiles.length
}
