const path = require('path')
const eslint = require('eslint')
const linter = new eslint.Linter()

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('../../files.js')

const eslintConfig = require(path.join(
    __dirname,
    '../../../config/js/eslint.config.js'
))
log.debug('ESLint configuration file', eslintConfig)

/**
 * This a checker used by {tools/js/index.js} and needs to follow a
 * specific format.
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
        const { messages, fixed, output } = linter.verifyAndFix(
            text,
            eslintConfig,
            {
                filename: path.basename(file),
                allowInlineConfig: true,
                reportUnusedDisableDirectives: false,
            }
        )

        response.fixed = fixed
        response.output = output

        for (const message of messages) {
            let rule = ''
            if (message.ruleId) {
                rule = `(${message.ruleId})`
            }
            response.messages.push({
                checker: 'eslint',
                message: `Line ${message.line}: ${message.message} ${rule}`,
            })
        }
    } catch (error) {
        log.error(`ESLint format failed with error:\n${error}`)
        process.exit(1)
    }

    return response
}
