const prettier = require('prettier')
const path = require('path')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('./files.js')

// Prettier setup
const prettierConfig = path.join(__dirname, '../config/prettier.config.js')

log.debug('Prettier configuration file', prettierConfig)

exports.check_fmt = function check_prettier(files) {
    const not_pretty_files = []
    for (const file of files) {
        const text = readFile(file)
        const name = path.basename(file)

        if (!text) {
            log.debug('No text work on.', file, text)
            continue
        }

        try {
            const options = prettier.resolveConfig.sync(file, {
                editorconfig: false,
                config: prettierConfig,
            })

            const checked = prettier.check(text, {
                ...options,
                filepath: file,
            })

            if (checked) {
                log.debug(`${name} is formatted according to style`)
            } else {
                not_pretty_files.push(file)
            }
        } catch (error) {
            log.error('Formatting failed.', file, error)
        }
    }

    return not_pretty_files
}

exports.apply_fmt = function apply_prettier(files) {
    const pretty_files = []
    for (const file of files) {
        const text = readFile(file)
        const name = path.basename(file)

        if (!text) {
            log.debug('No text work on.', file, text)
            continue
        }

        try {
            const options = prettier.resolveConfig.sync(file, {
                editorconfig: false,
                config: prettierConfig,
            })

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

            if (formatted === text) {
                log.debug('Input/output identical, skipping.', name)
                continue
            }

            const success = writeFile(file, formatted)
            success
                ? log.debug('file written to disk')
                : log.debug('file write FAILED')

            pretty_files.push(file)
        } catch (error) {
            log.error('Formatting failed.', file, error)
        }
    }

    return pretty_files
}
