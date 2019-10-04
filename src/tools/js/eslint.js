const path = require('path')
const eslint = require('eslint')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('../../files.js')
const { CONFIG_ROOT, CONSUMING_ROOT, ESLINT_CONFIG } = require('../../paths.js')

let hasLogged = false
function fallbackLog(err) {
    if (!hasLogged) {
        log.warn(
            'Could not init ESLint with local config, falling back to built-in (run with --verbose for more info)'
        )
        log.debug('Error from local cfg:\n', err)
        hasLogged = true
    }
}

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
        reportUnusedDisableDirectives: true,
    }
    try {
        const engine = new eslint.CLIEngine({
            ...options,
            useEslintrc: true,
        })

        report = engine.executeOnFiles([file])
        //log.debug(`Resolved configuration for ${path.basename(file)}`, engine.getConfigForFile(file))
    } catch (err) {
        fallbackLog(err)

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
            if (message.line) {
                response.messages.push({
                    checker: 'eslint',
                    message: `Line ${message.line}: ${message.message} ${rule}`,
                })
            } else {
                log.debug(
                    `No line number, assuming general message: ${message.message}`
                )
            }
        }
    } catch (error) {
        log.error(`ESLint format failed with error:\n${error}`)
        process.exit(1)
    }

    return response
}
