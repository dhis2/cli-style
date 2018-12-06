#!/usr/bin/env node
const argv = require('yargs')
    .usage('usage: $0 <command> [options]')
    .command(require('./lib/cmds/fmt-commit.js'))
    .help().argv
