const path = require('path')

// measure performance for potential hotspots when running tools
// sequentially, to see results run with `--verbose`
const perf = require('perfy')

const log = require('@dhis2/cli-helpers-engine').reporter

const eslint = require('./eslint.js')
const prettier = require('./prettier.js')

const { readFile } = require('./files.js')

/*
 *  Order of the tools is important.
 */
const tools = [
    eslint,

    // run the formatter last!
    prettier,
]

function checkFile(file) {
    const p = path.relative(process.cwd(), file)
    const text = readFile(file)

    let messages = []
    let source = text

    perf.start('check-file')
    for (const tool of tools) {
        const result = tool(file, source, false)

        source = result.output
        messages = messages.concat(result.messages)
    }
    log.debug(`${p}: ${perf.end('check-file').summary}`)

    return {
        file,
        messages,
        name: path.basename(file),
    }
}

function fixFile(file) {
    const text = readFile(file)
    const p = path.relative(process.cwd(), file)

    let messages = []
    let source = text

    perf.start('fix-file')
    for (const tool of tools) {
        const result = tool(file, source, true)

        source = result.output
        messages = messages.concat(result.messages)
    }
    log.debug(`${p}: ${perf.end('fix-file').summary}`)

    return {
        file,
        messages,
        output: source,
        name: path.basename(file),
    }
}

exports.check = files => {
    perf.start('check-all-files')
    const checked = files.map(checkFile)
    log.debug(`${perf.end('check-all-files').summary}`)

    return checked
}

exports.apply = files => {
    perf.start('fix-all-files')
    const applied = files.map(fixFile)
    log.debug(`${perf.end('fix-all-files').summary}`)

    return applied
}
