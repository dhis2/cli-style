const log = require('@dhis2/cli-helpers-engine').reporter
const { callback: runCb } = require('@dhis2/cli-helpers-engine').exec
const { exit } = require('@dhis2/cli-helpers-engine')
const { prettier } = require('../../tools/prettier.js')
const { eslint } = require('../../tools/stylelint.js')
const { configured } = require('../../utils/config.js')
const { selectFiles } = require('../../utils/files.js')
const {
    sayFilesChecked,
    sayNoFiles,
} = require('../../utils/std-log-messages.js')

exports.command = 'css [files..]'

exports.aliases = ['css']

exports.desc = 'CSS code style'

exports.builder = (yargs) =>
    yargs.positional('files', {
        describe: '',
        type: 'string',
    })

exports.handler = (argv, callback) => {
    if (
        !argv.config.patterns ||
        (argv.config.patterns && !argv.config.patterns.js)
    ) {
        log.warn('No css patterns defined, please check the configuration file')
        exit(1)
    }

    const finalStatus = callback || runCb()

    const {
        config: {
            patterns: { css: cssPattern },
        },
        files,
        staged,
        apply,
    } = argv

    const cssFiles = selectFiles(files, cssPattern, staged)

    if (cssFiles.length === 0) {
        log.debug(sayNoFiles('css', cssPattern, staged))
        return
    }

    if (configured('stylelint')) {
        log.info('css > stylelint')
        eslint({
            apply,
            files: cssFiles,
            callback: finalStatus,
        })

        if (finalStatus() === 0) {
            log.print('All matched files pass the lint rules.')
            log.print('')
        }
    } else {
        log.log('No Stylelint configuration found')
    }

    if (configured('prettier')) {
        log.info('css > prettier')
        prettier({
            apply,
            files: cssFiles,
            callback: finalStatus,
        })
    } else {
        log.log('No Prettier configuration found')
    }

    if (!callback) {
        log.debug(sayFilesChecked('css', cssFiles.length, apply))
        exit(finalStatus())
    }

    return cssFiles.length
}
