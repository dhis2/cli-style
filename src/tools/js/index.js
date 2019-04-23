const path = require('path')

// measure performance for potential hotspots when running tools
// sequentially, to see results run with `--verbose`
const perf = require('perfy')

const log = require('@dhis2/cli-helpers-engine').reporter

const eslint = require('./eslint.js')
const prettier = require('./prettier.js')

const { readFile } = require('../../files.js')

/*
 *  Order of the tools is important.
 */
const tools = [
    eslint,

    // run the formatter last!
    prettier,
]

/**
 * @param {string} path to the file to run tools on
 * @param {boolean} if the tool should apply fixes
 */
function run(file, fix) {
    const p = path.relative(process.cwd(), file)
    const text = readFile(file)

    let messages = []
    let source = text

    perf.start('exec-file')
    for (const tool of tools) {
        const result = tool(file, source, fix)

        source = result.output
        messages = messages.concat(result.messages)
    }
    log.debug(`${p}: ${perf.end('exec-file').summary}`)

    return {
        file,
        messages,
        output: source,
        name: path.basename(file),
    }
}

exports.check = files => {
    perf.start('check-all-files')
    const checked = files.map(f => run(f, false))
    log.debug(`${files.length} file(s): ${perf.end('check-all-files').summary}`)

    return checked
}

exports.apply = files => {
    perf.start('fix-all-files')
    const applied = files.map(f => run(f, true))
    log.debug(`${files.length} file(s): ${perf.end('fix-all-files').summary}`)

    return applied
}
