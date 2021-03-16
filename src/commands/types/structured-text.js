const { namespace } = require('@dhis2/cli-helpers-engine')
const log = require('@dhis2/cli-helpers-engine').reporter
const { prettier } = require('../../tools/prettier.js')
const { selectFiles } = require('../../utils/files.js')
const {
    sayFilesChecked,
    sayNoFiles,
} = require('../../utils/std-log-messages.js')
const { textHandler } = require('../helpers.js')

exports.command = 'text [files..]'
exports.aliases = ['structured-text']
exports.desc = 'Structured text style'
exports.builder = yargs =>
    yargs.positional('files', {
        describe: '',
        type: 'string',
    })

exports.handler = argv => {
    if (!argv.patterns || argv.patterns && !argv.patterns.text) {
        log.warn('No text patterns defined, please check your configuration file')
        process.exit(1)
    }

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

    log.info('')
    textHandler({
        apply,
        files: textFiles,
        staged,
        pattern: textPattern,
    })
}
