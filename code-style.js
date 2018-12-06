#!/usr/bin/env node
// built-ins
const path = require('path')
const fs = require('fs')

/**
 * `repoDir`   - points to the repo which needs to be formatted
 * `dir`       - points to the code-style package in node_modules, and
 *               if it doesn't exist, use the `cwd`
 * `codeDir`   - root directory for the code to format
 * `codeFiles` - files to format from `codeDir`
 */
const argv = require('yargs')
    .config({
        root_dir: process.cwd(),
        cwd: cwd(),
    })
    .usage('usage: $0 <command> [options]')
    .command(require('./lib/cmds/fmt-code.js'))
    .help().argv

function cwd() {
    try {
        const nodeModulePath = path.join(
            process.cwd(),
            'node_modules',
            '@dhis2',
            'code-style'
        )
        fs.accessSync(nodeModulePath)
        return nodeModulePath
    } catch (err) {
        return process.cwd()
    }
}
