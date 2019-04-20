const path = require('path')

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
    const text = readFile(file)

    let messages = []
    let source = text
    for (const tool of tools) {
        const result = tool(file, source, false)

        source = result.output
        messages = messages.concat(result.messages)
    }

    return {
        file,
        messages,
        name: path.basename(file),
    }
}

function fixFile(file) {
    const text = readFile(file)

    let messages = []
    let source = text
    for (const tool of tools) {
        const result = tool(file, source, true)

        source = result.output
        messages = messages.concat(result.messages)
    }

    return {
        file,
        messages,
        output: source,
        name: path.basename(file),
    }
}

exports.check = files => {
    return files.map(checkFile)
}

exports.apply = files => {
    return files.map(fixFile)
}
