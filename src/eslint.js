const eslint = require('eslint')
const path = require('path')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('./files.js')

const eslintConfig = path.join(__dirname, '../config/eslint.config.js')

log.debug('ESLint configuration file', eslintConfig)

const cli = new eslint.CLIEngine({
    configFile: eslintConfig,
    useEslintrc: false,
    fix: true,
})

function lint(text) {
    return cli.executeOnText(text)
}

exports.check = (file, text) => {
    if (!text) {
        text = readFile(file)
    }

    const name = path.basename(file)

    const messages = []

    if (text) {
        try {
            const report = lint(text)

            // when using `executeOnText` the results array always has a
            // single element
            const results = report.results[0].messages

            for (const message of results) {
                messages.push({
                    checker: 'eslint',
                    line: message.line,
                    rule: message.ruleId,
                    message: `${message.message}`,
                })
            }
        } catch (error) {
            messages.push({
                message: `Formatting failed: ${error}`,
            })
        }
    }

    return messages
}

exports.apply = (file, text) => {
    if (!text) {
        text = readFile(file)
    }

    const name = path.basename(file)

    const messages = []

    if (text) {
        try {
            const report = lint(text)

            // when using `executeOnText` the results array always has a
            // single element
            const results = report.results[0].messages

            if (results.output) {
                const fixable =
                    results.fixableErrorCount + results.fixableWarningCount

                const success = writeFile(file, results.output)

                messages.push({
                    message: success
                        ? `Applied ${fixable} fixes successfully and wrote to disk`
                        : 'File failed to be written to disk',
                })
            }

            for (const message of results) {
                if (!message.hasOwnProperty('fix')) {
                    messages.push({
                        checker: 'eslint',
                        line: message.line,
                        rule: message.ruleId,
                        message: `${message.message}`,
                    })
                }
            }
        } catch (error) {
            messages.push({
                message: `Formatting failed: ${error}`,
            })
        }
    }

    return messages
}
