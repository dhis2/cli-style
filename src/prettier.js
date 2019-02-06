const prettier = require('prettier')
const path = require('path')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('./files.js')

function prettify(cwd, files, check = false) {
    // Prettier setup
    const prettierConfig = path.join(cwd, 'config', 'prettier.config.js')
    log.debug('prettierConfig', prettierConfig)

    return files
        .map(file => {
            const text = readFile(file)
            const name = path.basename(file)

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

                if (check) {
                    const checked = prettier.check(text, {
                        ...options,
                        filepath: file,
                    })

                    if (checked) {
                        log.debug(`${name} is formatted according to style`)
                        return null
                    }
                } else {
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

                    if (formatted !== text) {
                        const success = writeFile(file, formatted)
                        success
                            ? log.debug('file written to disk')
                            : log.debug('file write FAILED')
                    } else {
                        log.debug('Input/output identical, skipping.', name)
                        return null
                    }

                    log.info(`Reformatted: ${name}`)
                }
            } catch (error) {
                log.error('Formatting failed.', file, error)
                return null
            }

            return file
        })
        .filter(i => i)
}

module.exports = prettify
