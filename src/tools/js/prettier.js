const path = require('path')
const prettier = require('prettier')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('../../files.js')

const prettierConfig = path.join(
    __dirname,
    '../../../config/js/prettier.config.js'
)
log.debug('Prettier configuration file', prettierConfig)

const editorconfig = false
const useCache = true

/**
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
        const options = resolveConfig(file)

        if (!options) {
            log.error('Failed to resolve a Prettier configuration')
            process.exit(1)
        }

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

function resolveConfig(file) {
    let options

    try {
        options = prettier.resolveConfig.sync(file, {
            editorconfig,
            useCache,
            config: path.join(process.cwd(), '.prettierrc.js'),
        })
        log.debug('Using extended Prettier configuration from repo')
    } catch (e) {
        options = prettier.resolveConfig.sync(file, {
            editorconfig,
            useCache,
            config: prettierConfig,
        })
        log.debug('Using default Prettier configuration')
    }

    return options
}
