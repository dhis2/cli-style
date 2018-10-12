/** @format */

const fs = require('fs')
const path = require('path')

const log = require('./log.js')

const whitelist = ['.js', '.json', '.css', '.scss', '.md', '.jsx']
const blacklist = ['node_modules', 'build', 'dist']

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
        .filter(f => whitelist.includes(path.extname(f)))
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
        log.info('Writing prettified...', fp)
        fs.writeFileSync(fp, content, 'utf8')
        return true
    } catch (error) {
        log.error('writing failed', fp, error)
        return false
    }
}

module.exports = {
    collectFiles,
    readFile,
    writeFile,
}
