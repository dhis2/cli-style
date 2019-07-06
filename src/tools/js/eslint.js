const path = require('path')
const eslint = require('eslint')
const linter = new eslint.Linter()

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile, fileExists } = require('../../files.js')

const eslintConfig = resolveConfig()
log.debug('ESLint configuration file', eslintConfig)

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

function resolveConfig() {
    const repoEslintConfig = path.join(process.cwd(), '.eslintrc.js')
    const defaultEslintConfig = path.join(
        __dirname,
        '../../../config/js/eslint.config.js'
    )

    if (
        fileExists(repoEslintConfig) &&
        fileExists(
            path.join(
                process.cwd(),
                'node_modules',
                '@dhis2',
                'cli-style',
                'config',
                'js',
                'eslint.config.js'
            )
        )
    ) {
        log.debug('Using extended ESLint configuration from repo')
        return require(repoEslintConfig)
    } else {
        log.debug('Using default ESLint configuration')
        return require(defaultEslintConfig)
    }
}
