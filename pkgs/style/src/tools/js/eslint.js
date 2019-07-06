const path = require('path')
const eslint = require('eslint')

const linter = new eslint.Linter()

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile, fileExists } = require('../../files.js')

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

    const cli = resolveConfig(apply)

    try {
        const report = cli.executeOnText(text, path.basename(file), true)

        // there is always one (1) result from executeOnText
        const result = report.results[0]
        const fixed = !!result.output ? true : false
        const output = result.output || result.source
        const messages = result.messages

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
    const config = {
        resolvePluginsRelativeTo: path.join(process.cwd(), 'node_modules'),
        useEslintrc: false,
        fix: true,
        cwd: process.cwd(),
        ignore: false,
        globInputPaths: false,
    }
    let cli
    try {
        cli = new eslint.CLIEngine({
            ...config,
            baseConfig: require(path.join(process.cwd(), '.eslintrc.js')),
        })
        log.info('Using extended ESLint configuration from repo')
    } catch (e) {
        console.error(e)
        cli = new eslint.CLIEngine({
            ...config,
            baseConfig: require('@dhis2/eslint-config-base'),
        })
        log.info('Using default ESLint configuration')
    }

    return cli
}
