#!/usr/bin/env node
const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter

// usage: node[0] script[1] group[2]
const group = process.argv[2]
const fix = process.argv[3] === 'true'
const files = process.argv[4].split(',')

const runner = require(path.join(__dirname, group)).runner
const report = runner(files, fix)

if (fix) {
    const fixed = report.fix()
    log.info(`${fixed.length} files fixed.`)
}

let violations = 0
if (report.hasViolations) {
    violations += report.violations.length
}

if (violations > 0) {
    log.error(`${violations} file(s) violate the code standard.`)
    report.violations.map(f => {
        log.error(`${f.file}`)
        f.messages.map(m => log.error(`${m.message}`));
    })
    process.exit(1)
}
