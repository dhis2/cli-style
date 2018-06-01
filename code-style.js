#!/usr/bin/env node
"use strict"

const path = require('path')
const fs = require('fs')

const prettier = require('prettier')
const CLIEngine = require("eslint").CLIEngine

const whitelist = ['.js', '.json', '.css', '.scss', '.md']

const log = {
    info: (msg, ...args) => console.info('[CODESTYLE]', msg, ...args),
    error: (msg, ...args) => console.error('[CODESTYLE]', msg, ...args)
}

function collectFiles(target) {
    const files = fs.readdirSync(target)

    return files.map(file => {
        const fullPath = path.join(target, file)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
            return collectFiles(fullPath)
        } else {
            return fullPath
        }
    }).reduce((a, b) => a.concat(b), [])
}

// get the repo dir from argv to ensure that symlinks are respected
const repoDir = process.cwd() //path.join(path.dirname(process.argv[1]), '..', '..')
log.info('repoDir', repoDir)

// `dir` points to the code-style directory to get the configs
const dir = path.join(repoDir, 'node_modules', '@dhis2', 'code-style')
log.info('dir', dir)

const codeDir = path.join(repoDir, 'src')
log.info('codeDir', codeDir)

const codeFiles = collectFiles(codeDir).filter(f => whitelist.includes(path.extname(f)))

// Prettier setup
const prettierConfig = path.join(dir, 'prettier.config.js')
codeFiles.map(file => {
    let text
    try {
        text = fs.readFileSync(file, 'utf8')
    } catch (error) {
        log.error('Reading failed', file, error)
    }

    if (!text) {
        log.error('No text work on.', file, text)
        return
    }

    let formatted
    try {
        const options = prettier.resolveConfig.sync(file, { editorconfig: false, config: prettierConfig })
        formatted = prettier.format(text, { ...options, filepath: file })
    } catch (error) {
        log.error('Formatting failed.', file, error)
    }

    if (formatted === text) {
        log.info('Input/output identical, skipping...', file)
        return
    }

    try {
        log.info('Writing prettified...', file)
        fs.writeFileSync(file, formatted, 'utf8')
    } catch (error) {
        log.error('writing failed', file, error)
    }
    
})

// ESLint setup
const eslintCLI = new CLIEngine({
    envs: ["browser", "node"],
    configFile: path.join(dir, 'eslint.config.js'),
    useEslintrc: false,
    fix: true
})

const report = eslintCLI.executeOnFiles(codeFiles)

CLIEngine.outputFixes(report)

log.info('Thank you, come again!')
