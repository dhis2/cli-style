#!/usr/bin/env node
"use strict"

const prettier = require('prettier')

const path = require('path')

const CLIEngine = require("eslint").CLIEngine

const repoDir = path.join(path.dirname(process.argv[1]), '..', '..')
console.log('repoDir', repoDir)
const dir = path.join(repoDir, 'node_modules', '@dhis2', 'code-style')

const cli = new CLIEngine({
    envs: ["browser", "mocha"],
    configFile: path.join(dir, 'eslintrc.json'),
    useEslintrc: false,
    fix: true
})

const code = path.join(repoDir, 'src', 'index.js')

//console.log(cli.getConfigForFile(code))

console.log(code)

let report = cli.executeOnFiles([code])

console.log(report)
CLIEngine.outputFixes(report)
