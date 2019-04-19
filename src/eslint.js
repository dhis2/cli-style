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
 * @return {Array} messages An array of Messages
 */
module.exports = (file, text, apply = false) => {
    if (!text) {
        text = readFile(file)
    }

    const messages = []

    if (text) {
        // TODO: reliably switch between 'script' and 'module' based on
        // source code. For now module seems to work for node too.
        const sourceType = 'module'

        try {
            const cli = new eslint.CLIEngine({
                baseConfig: {
                    parserOptions: {
                        sourceType,
                    },
                },
                configFile: eslintConfig,
                useEslintrc: false,
                fix: apply,
            })
            const report = cli.executeOnText(text)

            // when using `executeOnText` the results array always has a
            // single element
            const result = report.results[0]

            for (const message of result.messages) {
                messages.push({
                    checker: 'eslint',
                    line: message.line,
                    rule: message.ruleId,
                    message: `${message.message} (${message.ruleId})`,
                })
            }

            if (apply && result.output) {
                const success = writeFile(file, result.output)

                if (!success) {
                    messages.push({
                        checker: 'eslint',
                        message: 'File failed to be written to disk',
                    })
                }
            }
        } catch (error) {
            messages.push({
                message: `Formatting ${file} failed: ${error}`,
            })
        }
    }

    return messages
}
