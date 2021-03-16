const log = require('@dhis2/cli-helpers-engine').reporter
const { eslint } = require('../../tools/eslint.js')
const { prettier } = require('../../tools/prettier.js')
const { selectFiles } = require('../../utils/files.js')
const {
    sayFilesChecked,
    sayNoFiles,
} = require('../../utils/std-log-messages.js')
const { jsLintHandler, jsFormatHandler } = require('../helpers.js')

exports.command = 'js [files..]'

exports.aliases = ['javascript']

exports.desc = 'JavaScript code style'

exports.builder = yargs =>
    yargs.positional('files', {
        describe: '',
        type: 'string',
    })

exports.handler = argv => {
    if (!argv.patterns || argv.patterns && !argv.patterns.js) {
        log.warn('No javascript patterns defined, please check the configuration file')
        process.exit(1)
    }

    const {
        patterns: { js: jsPattern },
        files,
        staged,
        apply,
    } = argv

    const jsFiles = selectFiles(files, jsPattern, staged)

    if (jsFiles.length === 0) {
        log.warn(sayNoFiles('javascript', jsPattern, staged))
        return
    }

    log.debug(`Linting files: ${files.join(', ')}`)

    log.info('> javascript: eslint')
    eslint({
        apply,
        files: jsFiles,
    })

    log.debug(`Linting files: ${files.join(', ')}`)

    log.info('> javascript: prettier')
    prettier({
        apply,
        files,
    })
    log.info('')

    log.print(sayFilesChecked('javascript', jsFiles.length, apply))
}
