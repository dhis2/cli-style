#!/usr/bin/env node
/**
 * `repoDir`   - points to the repo which needs to be formatted
 * `dir`       - points to the code-style package in node_modules, and
 *               if it doesn't exist, use the `cwd`
 * `codeDir`   - root directory for the code to format
 * `codeFiles` - files to format from `codeDir`
 */
const argv = require('yargs')
    .usage('usage: $0 <command> [options]')
    .command(require('./lib/cmds/fmt-code.js'))
    .help().argv
