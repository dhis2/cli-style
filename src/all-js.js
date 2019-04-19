const path = require('path')

const eslint = require('./eslint.js')
const prettier = require('./prettier.js')

const { readFile } = require('./files.js')

const tools = [eslint, prettier]

function checkFile(file) {
    const text = readFile(file)

    return {
        file: file,
        name: path.basename(file),
        messages: tools.map(c => c(file, text)).reduce((a, b) => a.concat(b)),
    }
}

function fixFile(file) {
    const text = readFile(file)

    return {
        file: file,
        name: path.basename(file),
        messages: tools
            .map(c => c(file, text, true))
            .reduce((a, b) => a.concat(b)),
    }
}

exports.check = files => {
    return files.map(checkFile)
}

exports.apply = files => {
    return files.map(fixFile)
}
