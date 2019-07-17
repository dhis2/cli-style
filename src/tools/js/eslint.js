const path = require('path')
const eslint = require('eslint')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('../../files.js')
const { CONFIG_ROOT, CONSUMING_ROOT, ESLINT_CONFIG } = require('../../paths.js')

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

    const eslintConfig = process.env.CLI_STYLE_ESLINT_CONFIG || ESLINT_CONFIG

    let report
    const options = {
        baseConfig: require(eslintConfig),
        fix: apply,
        ignore: true,
    }
    try {
        const engine = new eslint.CLIEngine({
            ...options,
            useEslintrc: true,
        })

        report = engine.executeOnFiles([file])
        //log.debug(`Resolved configuration for ${path.basename(file)}`, engine.getConfigForFile(file))
    } catch (err) {
        log.debug(
            'Could not init ESLint with local configuration, falling back to built-in. Error from local cfg:\n',
            err
        )

        const engine = new eslint.CLIEngine({
            ...options,
            useEslintrc: false,
        })

        report = engine.executeOnFiles([file])
        //log.debug(`Resolved configuration for ${path.basename(file)}`, engine.getConfigForFile(file))
    }

    try {
        const result = report.results[0]

        if (!result) {
            throw new Error('Report contained no result')
        }

        const fixed = result.hasOwnProperty('output')
        const output = result.output || result.source || text
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
