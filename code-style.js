#!/usr/bin/env node
"use strict"

// built-ins
const path = require('path')
const fs = require('fs')

// support crew
const {
    collectFiles,
    readFile,
    writeFile
} = require('./lib/files.js')
const log = require('./lib/log.js')

// heavy lifters
const prettify = require('./lib/prettier.js')
const delint = require('./lib/eslint.js')
const stage = require('./lib/git.js')

function exit(code) {
    process.exit(code)
}

/**
 * `repoDir`   - points to the repo which needs to be formatted
 * `dir`       - points to the code-style package in node_modules
 * `codeDir`   - root directory for the code to format
 * `codeFiles` - files to format from `codeDir`
 */
const repoDir = process.cwd()
const dir = path.join(repoDir, 'node_modules', '@dhis2', 'code-style')
const codeDir = path.join(repoDir)
const codeFiles = collectFiles(codeDir)

// debug information about the folders
log.debug('repoDir?', repoDir)
log.debug('dir?', dir)
log.debug('codeDir?', codeDir)
log.debug('codeFiles?', codeFiles)

const pretty = prettify(dir, codeFiles)
log.debug('Pretty?', pretty)

const clean = delint(dir, codeFiles)
log.debug('Lint?', clean)

if (pretty && clean) {
    const staged = stage(codeDir)
    staged === 0
        ? log.info('Staging files OK...')
        : log.info('Staging files FAILED...')
} else {
    log.error('Code is either linty or not pretty, manual intervention required.')
    exit(1)
}

log.info('Code style complete.')
exit(0)
