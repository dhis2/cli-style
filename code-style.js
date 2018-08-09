#!/usr/bin/env node
"use strict"

const path = require('path')
const fs = require('fs')

const { spawnSync } = require('child_process')

const prettier = require('prettier')
const CLIEngine = require("eslint").CLIEngine

const whitelist = ['.js', '.json', '.css', '.scss', '.md', '.jsx']
const blacklist = ['node_modules', 'build', 'dist']

/*
 * log level options
 * -----------------
 * 0 = nothing
 * 1 = error
 * 2 = info
 * 3 = debug
 * 4 = trace
 */
const loglevel = 1
const log = {
    error: (msg, ...args) =>  loglevel > 0 ? console.error('[CODESTYLE]', msg, ...args) : null,
    info: (msg, ...args) => loglevel > 1 ? console.info('[CODESTYLE]', msg, ...args) : null,
    debug: (msg, ...args) => loglevel > 2 ? console.log('[CODESTYLE]', msg, ...args) : null,
    trace: (msg, ...args) => loglevel > 3 ? console.trace(msg, ...args) : null,
}

function collectFiles(target) {
    const files = fs.readdirSync(target)

    return files.map(file => {
        const fullPath = path.join(target, file)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory() && !blacklist.includes(file)) {
            return collectFiles(fullPath)
        } else {
            return fullPath
        }
    }).reduce((a, b) => a.concat(b), [])
}

// get the repo dir from argv to ensure that symlinks are respected
const repoDir = process.cwd() //path.join(path.dirname(process.argv[1]), '..', '..')
log.debug('repoDir', repoDir)

// `dir` points to the code-style directory to get the configs
const dir = path.join(repoDir, 'node_modules', '@dhis2', 'code-style')
log.debug('dir', dir)

const codeDir = path.join(repoDir)
log.debug('codeDir', codeDir)

const codeFiles = collectFiles(codeDir).filter(f => whitelist.includes(path.extname(f)))
log.debug('codeFiles', codeFiles)

// Prettier setup
const prettierConfig = path.join(dir, 'prettier.config.js')
log.debug('prettierConfig', prettierConfig)

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

        const added = spawnSync('git', ['add', file], { cwd: codeDir })
        added.status === 0
            ? log.info('Staging file OK...', file)
            : log.info('Staging file FAILED...', file)

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

log.info('Code style complete.')
