const fs = require('fs')
const path = require('path')

const log = require('@dhis2/cli-helpers-engine').reporter

// blacklists for files
const blacklist = ['node_modules', 'build', 'dist', 'target', '.git', 'vendor']

// whitelists for files
const whitelists = {
    js: ['.js', '.jsx', '.ts'],
    json: ['.json'],
    all: ['.js', '.json', '.css', '.scss', '.md', '.jsx', '.ts'],
}

function whitelisted(whitelist) {
    return function(file) {
        return whitelist.includes(path.extname(file))
    }
}

function jsFiles(arr) {
    const whitelist = whitelisted(whitelists.js)
    return arr.filter(whitelist)
}

function jsonFiles(arr) {
    const whitelist = whitelisted(whitelists.json)
    return arr.filter(whitelist)
}

function collectJsFiles(target) {
    const whitelist = whitelisted(whitelists.js)
    return collectFiles(target).filter(whitelist)
}

function collectAllFiles(target) {
    const whitelist = whitelisted(whitelists.all)
    return collectFiles(target).filter(whitelist)
}

function collectRejectedFiles(target) {
    const whitelist = whitelisted(['.rej'])
    return collectFiles(target).filter(whitelist)
}

function collectFiles(target) {
    const files = fs.readdirSync(target)

    return files
        .map(file => {
            const fullPath = path.join(target, file)
            const stat = fs.statSync(fullPath)

            if (stat.isDirectory() && !blacklist.includes(file)) {
                return collectFiles(fullPath)
            } else {
                return fullPath
            }
        })
        .reduce((a, b) => a.concat(b), [])
}

function readFile(fp) {
    try {
        const text = fs.readFileSync(fp, 'utf8')
        return text
    } catch (error) {
        log.error('Reading failed', fp, error)
        return null
    }
}

function writeFile(fp, content) {
    try {
        fs.writeFileSync(fp, content, 'utf8')
        return true
    } catch (error) {
        log.error('Writing failed', fp, error)
        return false
    }
}

function deleteFile(fp) {
    try {
        log.debug(`Deleting file: ${fp}`)
        fs.unlinkSync(fp)
        return true
    } catch (error) {
        log.error('File deletion failed', fp, error)
        return false
    }
}

module.exports = {
    collectFiles,
    collectAllFiles,
    collectJsFiles,
    collectRejectedFiles,
    deleteFile,
    jsFiles,
    jsonFiles,
    readFile,
    writeFile,
    whitelisted,
    whitelists,
}
