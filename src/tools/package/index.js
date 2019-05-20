const path = require('path')

// measure performance for potential hotspots when running tools
// sequentially, to see results run with `--verbose`
const perf = require('perfy')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile, jsonFiles } = require('../../files.js')

const tools = [
    require('./rules/valid-json.js'),
    require('./rules/pin-dhis2-package-versions.js'),
    require('./rules/husky-hooks.js'),
]

/**
 * @param {string} file path to the file to run tools on
 * @param {boolean} apply set to true if the tool should apply fixes
 */
function runTools(file, apply = false) {
    const p = path.relative(process.cwd(), file)
    const original = readFile(file)

    let messages = []
    let source = original
    let fixed = false

    perf.start('exec-file')
    for (const tool of tools) {
        const result = tool(file, source, apply)

        if (result.fixed) {
            source = result.output
            fixed = result.fixed
        }

        messages = messages.concat(result.messages)
    }
    log.debug(`${p}: ${perf.end('exec-file').summary}`)

    return {
        file,
        messages,
        fixed,
        output: source,
        name: path.basename(file),
    }
}

/**
 * The executor which gathers an array of report objects
 */
function exec(files, apply = false) {
    perf.start('exec-all-files')
    const report = files.map(f => runTools(f, apply))
    log.debug(`${files.length} file(s): ${perf.end('exec-all-files').summary}`)

    return report
}

/**
 * Apply fixes for code standard violations automatically.
 */
function fix(fixable) {
    if (fixable.length === 0) {
        return []
    }

    const fixed = fixable.map(f => {
        const success = writeFile(f.file, f.output)
        log.debug(`${f.file} written successfully: ${success}`)

        if (!success) {
            log.error(`Failed to write ${f.name} to disk`)
            process.exit(1)
        }

        return f.file
    })

    log.info(`Applied fixes for ${fixed.length} file(s).`)
    return fixed
}

/**
 * Pretty print a report object
 */
function print(report, violations) {
    log.info(`${report.length} file(s) checked.`)

    if (violations.length > 0) {
        violations.forEach(f => {
            const p = path.relative(process.cwd(), f.file)
            log.info('')
            log.print(`${p}`)
            f.messages.map(m => log.info(`${m.message}`))
        })

        log.info('')
        log.error(`${violations.length} file(s) violate the code standard.`)
    }
}

function getViolations(report) {
    return report.filter(f => f.messages.length > 0)
}

function getAutoFixable(report) {
    return report.filter(f => f.fixed)
}

/**
 * @param {Array} files list of files to check
 * @param {boolean} apply set to true should fixes be automatically applied
 *
 * @return {Object} a report object
 */
exports.runner = (files = [], apply = false) => {
    console.log(files)
    const packages = jsonFiles(files).filter(f => f.includes('package.json'))

    log.debug(`Files to operate on:\n${packages.join('\n')}`)

    const report = exec(packages, apply)
    const autofixes = getAutoFixable(report)
    const violations = getViolations(report)

    const hasViolations = violations.length > 0

    log.debug(`Violations: ${violations.length}`)
    log.debug(`Autofixes: ${autofixes.length}`)

    return {
        files: packages,
        summarize: () => print(report, violations),
        fix: () => fix(autofixes),
        violations,
        hasViolations,
        report,
    }
}
