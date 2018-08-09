const prettier = require('prettier')
const path = require('path')

const log = require('./log.js')

const {
    readFile,
    writeFile
} = require('./files.js')

function prettify(cwd, files) {
    // Prettier setup
    const prettierConfig = path.join(cwd, 'prettier.config.js')
    log.debug('prettierConfig', prettierConfig)

    files.map(file => {
        const text = readFile(file)

        if (!text) {
            log.error('No text work on.', file, text)
            return
        }

        let formatted
        try {
            const options = prettier.resolveConfig.sync(file, { editorconfig: false, config: prettierConfig })
            formatted = prettier.format(text, { ...options, filepath: file })
        } catch (error) {
            log.error('Formatting failed.', file, error)
            return
        }

        if (formatted !== text) {
            const success = writeFile(file, formatted)
            success
                ? log.debug('file written to disk')
                : log.debug('file write FAILED')
        } else {
            log.info('Input/output identical, skipping...', file)
            return
        }
    })

    return true
}

module.exports = prettify
