/** @format */

const path = require('path')
const CLIEngine = require('eslint').CLIEngine

const log = require('./log.js')

function delint(cwd, files) {
    // ESLint setup
    const eslintCLI = new CLIEngine({
        envs: ['browser', 'node'],
        configFile: path.join(cwd, 'config', 'eslint.config.js'),
        useEslintrc: false,
        fix: true,
        ignore: true,
        ignorePattern: ['*.css', '*.scss', '*.md', '*.json'],
    })

    const report = eslintCLI.executeOnFiles(files)

    const formatter = eslintCLI.getFormatter()
    log.info(formatter(report.results))

    const errors = CLIEngine.getErrorResults(report.results)
    if (errors.length > 0) {
        log.error('Fatal errors encountered')
        return false
    }

    log.info('Attempt to apply fixes...')
    CLIEngine.outputFixes(report)

    return true
}

module.exports = delint
