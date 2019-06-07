const path = require('path')
const prettier = require('prettier')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('../../files.js')

const prettierConfig = path.join(
    __dirname,
    '../../../config/js/prettier.config.js'
)
log.debug('Prettier configuration file', prettierConfig)

/**
 * This a checker used by {run-js} and needs to follow a specific
 * format.
 *
 * @param {string} file File path
 * @param {string} text Content of File
 * @param {boolean} apply Write autofixes to disk
 * @return {Object} object with messages and output
 */
module.exports = (file, text, apply = false) => {
    const response = {
        messages: [],
        output: text,
        fixed: false,
    }

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
            response.output = hashbang.concat(restFormatted)
        } else {
            response.output = prettier.format(text, {
                ...options,
                filepath: file,
            })
        }

        response.fixed = text !== response.output

        if (!apply && response.fixed) {
            response.messages.push({
                checker: 'prettier',
                message: 'Not formatted according to standards.',
            })
        }
    } catch (error) {
        log.error(`Prettier format failed with error:\n${error}`)
        process.exit(1)
    }

    return response
}
