const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter
const fg = require('fast-glob')
const fs = require('fs-extra')
const { CONSUMING_ROOT } = require('./paths.js')
const { spawn } = require('./run.js')

// blacklists for files
const blacklist = [
    'node_modules',
    'build',
    'dist',
    'target',
    '.git',
    'vendor',
    'dest',
    '.d2',
    'CHANGELOG.md',
]

// whitelists for files
const whitelists = {
    js: ['.js', '.jsx', '.ts'],
    json: ['.json'],
    all: ['.js', '.json', '.css', '.scss', '.md', '.jsx', '.ts'],
}

function whitelisted(whitelist) {
    return function (file) {
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

function selectFiles(files, pattern, staged) {
    let codeFiles = []

    codeFiles = fg.sync([pattern], {
        globstar: true,
        dot: true,
        ignore: blacklist.map(b => `**/${b}/**`),
        absolute: true,
    })

    if (files) {
        codeFiles = codeFiles.filter(f => files.includes(f))
    }

    if (staged) {
        codeFiles = stagedFiles(codeFiles)
    }

    return codeFiles
}

const stagedFiles = (files = []) => {
    const cmd = 'git'
    const args = [
        'diff',
        '--cached',
        '--name-only',
        '--relative',
        '--diff-filter=d',
    ]

    const result = spawn(cmd, args, {
        encoding: 'utf8',
        stdio: 'pipe',
    })

    const output = result.stdout.trim()

    if (output) {
        const staged = output.split('\n')
        return files.filter(f => staged.includes(f))
    }

    return []
}

const pickFirstExists = (files = [], customRoot) => {
    for (const file of files) {
        const fp = customRoot
            ? path.join(customRoot, file)
            : path.join(CONSUMING_ROOT, file)

        const exists = fs.existsSync(fp) && fs.statSync(fp).size !== 0

        if (exists) {
            log.debug(`Using ${fp} as the common ignore file.`)
            return fp
        }
    }

    return null
}

const resolveIgnoreFile = (ignoreFiles = []) => {
    return pickFirstExists([...ignoreFiles, '.d2styleignore', '.gitignore'])
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
    selectFiles,
    stagedFiles,
    writeFile,
    whitelisted,
    whitelists,
    blacklist,
    pickFirstExists,
    resolveIgnoreFile,
}
