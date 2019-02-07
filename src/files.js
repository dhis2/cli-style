const fs = require('fs')
const path = require('path')

const log = require('@dhis2/cli-helpers-engine').reporter

const whitelist = ['.js', '.json', '.css', '.scss', '.md', '.jsx']
const blacklist = ['node_modules', 'build', 'dist', 'target']

function whitelisted(file) {
    return whitelist.includes(path.extname(file))
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

function cwd() {
    return path.join(__dirname, '..')
}

module.exports = {
    collectFiles,
    readFile,
    writeFile,
    whitelisted,
    cwd,
}
