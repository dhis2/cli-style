/** @format */

const prettier = require('prettier')
const path = require('path')

const log = require('./log.js')

const { readFile, writeFile } = require('./files.js')

function prettify(cwd, files) {
    // Prettier setup
    const prettierConfig = path.join(cwd, 'config', 'prettier.config.js')
    log.debug('prettierConfig', prettierConfig)

    files.map(file => {
        const text = readFile(file)

        if (!text) {
            log.debug('No text work on.', file, text)
            return null
        }

        let formatted
        try {
            const options = prettier.resolveConfig.sync(file, {
                editorconfig: false,
                config: prettierConfig,
            })
            if (text.startsWith('#!')) {
                const firstNL = text.indexOf('\n')
                const hashbang = text.slice(0, firstNL + 1)
                const rest = text.slice(firstNL, -1)
                const restFormatted = prettier.format(rest, {
                    ...options,
                    filepath: file,
                })
                formatted = hashbang.concat(restFormatted)
            } else {
                formatted = prettier.format(text, {
                    ...options,
                    filepath: file,
                })
            }
        } catch (error) {
            log.error('Formatting failed.', file, error)
            return null
        }

        if (formatted !== text) {
            const success = writeFile(file, formatted)
            success
                ? log.debug('file written to disk')
                : log.debug('file write FAILED')
        } else {
            log.debug('Input/output identical, skipping...', file)
            return null
        }

        return null
    })

    return true
}

module.exports = prettify
