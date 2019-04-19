const prettier = require('prettier')
const path = require('path')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('./files.js')

// Prettier setup
const prettierConfig = path.join(__dirname, '../config/prettier.config.js')

log.debug('Prettier configuration file', prettierConfig)

module.exports = (file, text, apply = false) => {
    if (!text) {
        text = readFile(file)
    }

    const name = path.basename(file)
    const messages = []

    if (text) {
        try {
            const options = prettier.resolveConfig.sync(file, {
                editorconfig: false,
                config: prettierConfig,
            })

            const valid = prettier.check(text, {
                ...options,
                filepath: file,
            })

            if (!valid) {
                if (apply) {
                    let formatted
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

                    const success = writeFile(file, formatted)

                    if (!success) {
                        messages.push({
                            checker: 'prettier',
                            message: 'File failed to be written to disk',
                        })
                    }
                } else {
                    messages.push({
                        checker: 'prettier',
                        rule: 'code-style',
                        message: 'Not formatted according to standards.',
                    })
                }
            }
        } catch (error) {
            messages.push({
                checker: 'prettier',
                message: `Formatting failed: ${error}`,
            })
        }
    }

    return messages
}
