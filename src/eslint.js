const eslint = require('eslint')
const path = require('path')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('./files.js')

const eslintConfig = path.join(__dirname, '../config/eslint.config.js')

log.debug('ESLint configuration file', eslintConfig)

module.exports = (file, text, apply = false) => {
    const messages = []

    const cli = new eslint.CLIEngine({
        configFile: eslintConfig,
        useEslintrc: false,
        fix: apply,
    })

    if (!text) {
        text = readFile(file)
    }

    if (text) {
        try {
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

                success
                    ? log.debug(`${file} write success`)
                    : log.error(`${file} write fail`)
            }
        } catch (error) {
            messages.push({
                message: `Formatting ${file} failed: ${error}`,
            })
        }
    }

    return messages
}
