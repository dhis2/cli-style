const log = require('@dhis2/cli-helpers-engine').reporter
const { callback: runCb } = require('@dhis2/cli-helpers-engine').exec
const { exit } = require('@dhis2/cli-helpers-engine')
const { eslint } = require('../../tools/eslint.js')
const { prettier } = require('../../tools/prettier.js')
const { configured } = require('../../utils/config.js')
const { selectFiles } = require('../../utils/files.js')
const {
    sayFilesChecked,
    sayNoFiles,
} = require('../../utils/std-log-messages.js')

exports.command = 'js [files..]'

exports.aliases = ['javascript']

exports.desc = 'JavaScript code style'

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
        log.warn(
            'No javascript patterns defined, please check the configuration file'
        )
        exit(1)
    }

    const finalStatus = callback || runCb()

    const {
        config: {
            patterns: { js: jsPattern },
        },
        files,
        staged,
        apply,
    } = argv

    const jsFiles = selectFiles(files, jsPattern, staged)

    if (jsFiles.length === 0) {
        log.debug(sayNoFiles('javascript', jsPattern, staged))
        return
    }

    if (configured('eslint')) {
        log.info('javascript > eslint')
        eslint({
            apply,
            files: jsFiles,
            callback: finalStatus,
        })

        if (finalStatus() === 0) {
            log.print('All matched files pass the lint rules.')
            log.print('')
        }
    } else {
        log.log('No ESLint configuration found')
    }

    if (configured('prettier')) {
        log.info('javascript > prettier')
        prettier({
            apply,
            files: jsFiles,
            callback: finalStatus,
        })
    } else {
        log.log('No Prettier configuration found')
    }

    if (!callback) {
        log.debug(sayFilesChecked('javascript', jsFiles.length, apply))
        exit(finalStatus())
    }

    return jsFiles.length
}
