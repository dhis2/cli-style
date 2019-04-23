const path = require('path')

// measure performance for potential hotspots when running tools
// sequentially, to see results run with `--verbose`
const perf = require('perfy')

const log = require('@dhis2/cli-helpers-engine').reporter

const eslint = require('./eslint.js')
const prettier = require('./prettier.js')

const { readFile, writeFile, jsFiles } = require('../../files.js')

/*
 *  Order of the tools is important.
 */
const TOOLS = [
    eslint,

    // run the formatter last!
    prettier,
]

/**
 * @param {string} path to the file to run tools on
 * @param {boolean} if the tool should apply fixes
 */
function runTools(file, apply = false) {
    const p = path.relative(process.cwd(), file)
    const original = readFile(file)

    let messages = []
    let source = original

    perf.start('exec-file')
    for (const tool of TOOLS) {
        const result = tool(file, source, apply)

        source = result.output

        messages = messages.concat(result.messages)
    }
    log.debug(`${p}: ${perf.end('exec-file').summary}`)

    return {
        file,
        messages,
        output: source,
        modified: original !== source,
        name: path.basename(file),
    }
}

function exec(files, apply = false) {
    perf.start('exec-all-files')
    const report = files.map(f => runTools(f, apply))
    log.debug(`${files.length} file(s): ${perf.end('exec-all-files').summary}`)

    return report
}

function print(report, violations) {
    if (report.length === 0) {
        log.info('No files to check.')
        return
    }

    if (violations.length > 0) {
        log.error(`${violations.length} file(s) violate the code standards:`)
        violations.forEach(f => {
            const p = path.relative(process.cwd(), f.file)
            log.info('')
            log.print(`${p}`)
            f.messages.map(m => log.info(`${m.message}`))
        })

        log.info('')
    }
}

function getViolations(report) {
    const result = report.filter(f => f.messages.length > 0)
    return result
}

function fix(report) {
    const fixed = report
        .filter(f => f.modified)
        .map(f => {
            const success = writeFile(f.file, f.output)
            log.debug(`${f.file} written successfully: ${success}`)

            if (!success) {
                log.error(`Failed to write ${f.name} to disk`)
                process.exit(1)
            }

            return f.file
        })

    log.debug(`${fixed.length} file(s) automatically fixed.`)
    return fixed
}

exports.runner = (files, apply = false) => {
    const js = jsFiles(files)
    log.debug(`Files to operate on:\n${js.join('\n')}`)

    const report = exec(js, apply)
    const violations = getViolations(report)
    const hasViolations = violations.length > 0

    log.debug(`Violations: ${violations.length}`)

    return {
        files: js,
        summarize: () => print(report, violations),
        fix: () => fix(report),
        violations,
        hasViolations,
        report,
    }
}
