#!/usr/bin/env node
const path = require('path')

// usage: node[0] script[1] group[2]
const group = process.argv[2]
const fix = process.argv[3] === 'true'
const files = process.argv[4].split(',')

const runner = require(path.join(__dirname, group)).runner
const report = runner(files, fix)

function logerr(msg) {
    process.stderr.write(msg)
}

if (fix) {
    const fixed = report.fix()
    logerr(`${fixed.length} files fixed.`)
}

let violations = 0
if (report.hasViolations) {
    violations += report.violations.length
}

if (violations > 0) {
    logerr(`${violations} file(s) violate the code standard.`)
    report.violations.map(f => {
        logerr(`${f.file}`)
        f.messages.map(m => logerr(`${m.message}`))
    })
    process.exit(1)
}
