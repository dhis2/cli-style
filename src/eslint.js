const eslint = require('eslint')
const path = require('path')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('./files.js')

const eslintConfig = path.join(__dirname, '../config/eslint.config.js')

log.debug('ESLint configuration file', eslintConfig)

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
        output: '',
    }

    try {
        const cli = new eslint.CLIEngine({
            configFile: eslintConfig,
            useEslintrc: false,
            fix: apply,
        })
        const report = cli.executeOnText(text)

        // when using `executeOnText` the results array always has a
        // single element
        const result = report.results[0]

        for (const message of result.messages) {
            response.messages.push({
                checker: 'eslint',
                line: message.line,
                rule: message.ruleId,
                message: `${message.message} (${message.ruleId})`,
            })
        }

        if (result.output) {
            response.output = result.output
        }
    } catch (error) {
        log.error(`ESLint format failed with error:\n${error}`)
        process.exit(1)
    }

    return response
}
