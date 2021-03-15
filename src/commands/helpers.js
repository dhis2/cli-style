const log = require('@dhis2/cli-helpers-engine').reporter
const { eslint } = require('../tools/eslint.js')
const { prettier } = require('../tools/prettier.js')
const { selectFiles } = require('../utils/files.js')
const { sayFilesChecked, sayNoFiles } = require('../utils/std-log-messages.js')

const finalMsg = status => {
    if (status === 1) {
        log.info('')
        log.warn(
            'Code style violations found, run the apply command to automatically fix problems.'
        )
    }

    if (status === 2) {
        log.info('')
        log.info(
            'Internal error occurred, run with "--verbose" for more information.'
        )
    }

    log.info('')
    process.exit(status)
}

exports.jsLintHandler = ({ files, pattern, staged, apply, callback }) => {
    const opts = {
        apply,
    }

    opts.files = selectFiles(files, pattern, staged)

    if (opts.files.length === 0) {
        log.debug(sayNoFiles('javascript', pattern, staged))
        return
    }

    log.debug(`Linting files: ${opts.files.join(', ')}`)

    log.info('> javascript: eslint')
    eslint({
        ...opts,
        callback,
    })

    log.print(sayFilesChecked('javascript', opts.files.length, apply))
}

exports.jsFormatHandler = ({ files, pattern, staged, apply, callback }) => {
    const opts = {
        apply,
    }

    opts.files = selectFiles(files, pattern, staged)

    if (opts.files.length === 0) {
        log.debug(sayNoFiles('javascript', pattern, staged))
        return
    }

    log.debug(`Linting files: ${opts.files.join(', ')}`)

    log.info('> javascript: prettier')
    prettier({
        ...opts,
        callback,
    })

    log.print(sayFilesChecked('javascript', opts.files.length, apply))
}

exports.textHandler = ({ files, pattern, staged, apply, callback }) => {
    const opts = {
        apply,
    }

    opts.files = selectFiles(files, pattern, staged)

    if (opts.files.length === 0) {
        log.debug(sayNoFiles('text', pattern, staged))
        return
    }

    log.debug(`Linting files: ${opts.files.join(', ')}`)

    log.info('> structured-text: prettier')

    prettier({
        ...opts,
        callback,
    })

    log.print(sayFilesChecked('text', opts.files.length, apply))
}

exports.handler = (argv, apply) => {
    const {
        patterns: { js: jsPattern },
        patterns: { text: textPattern },
        types,
        files,
        staged,
    } = argv

    let finalStatus = 0

    const enableJs = !types ? true : types.includes('js')
    const enableText = !types ? true : types.includes('text')

    if (enableJs) {
        if (jsPattern) {
            log.info('')
            this.jsLintHandler({
                apply,
                files,
                staged,
                pattern: jsPattern,
                callback: ({ status }) =>
                    (finalStatus = status > finalStatus ? status : finalStatus),
            })

            log.info('')
            this.jsFormatHandler({
                apply,
                files,
                staged,
                pattern: jsPattern,
                callback: ({ status }) =>
                    (finalStatus = status > finalStatus ? status : finalStatus),
            })
        } else {
            log.warn(
                'No pattern configured for javascript, check your d2-style.config.js file'
            )
        }
    }

    if (enableText) {
        if (textPattern) {
            log.info('')
            this.textHandler({
                apply,
                files,
                staged,
                pattern: textPattern,
                callback: ({ status }) =>
                    (finalStatus = status > finalStatus ? status : finalStatus),
            })
        } else {
            log.warn(
                'No pattern configured for structured text, check your d2-style.config.js file'
            )
        }
    }

    finalMsg(finalStatus)
}
