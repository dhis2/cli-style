const path = require('path')

const eslint = require('./eslint.js')
const prettier = require('./prettier.js')

const { readFile } = require('./files.js')

function checkFile(file) {
    const text = readFile(file)

    return {
        file: file,
        name: path.basename(file),
        messages: [eslint.check, prettier.check]
            .map(c => c(file, text))
            .reduce((a, b) => a.concat(b)),
    }
}

function fixFile(file) {
    const text = readFile(file)

    return {
        file: file,
        name: path.basename(file),
        messages: [eslint.apply, prettier.apply]
            .map(c => c(file, text))
            .reduce((a, b) => a.concat(b)),
    }
}

// runs the checkers
exports.check_fmt = files => {
    return files.map(checkFile)
}

// runs the appliers
exports.apply_fmt = files => {
    return files.map(fixFile)
}
