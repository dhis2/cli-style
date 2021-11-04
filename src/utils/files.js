const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter
const { spawn } = require('@dhis2/cli-helpers-engine').exec
const fg = require('fast-glob')
const fs = require('fs-extra')
const mm = require('micromatch')
const { CONSUMING_ROOT, PROJECT_ROOT } = require('./paths.js')

// blacklists for files
const blacklist = [
    '.git',
    '.d2',
    '.yarn',
    'node_modules',
    'build',
    'dist',
    'target',
    'vendor',
    'dest',
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

function copy(from, to, { overwrite = false, backup = false }) {
    try {
        const exists = fs.existsSync(to)
        const empty = exists ? fs.statSync(to).size === 0 : false

        const replace = empty ? true : overwrite

        fs.ensureDirSync(path.dirname(to))

        if (exists) {
            if (backup && !replace) {
                const toNew = to.concat('.new')
                log.debug(
                    'Existing config found, use --overwrite or manually merge with:'
                )
                log.print(`${path.relative(CONSUMING_ROOT, toNew)}`)
                fs.copySync(from, toNew, { overwrite: true })
                return
            }

            if (replace) {
                log.debug('Overwriting existing configuration:')
                log.print(`${path.relative(CONSUMING_ROOT, to)}`)
                fs.copySync(from, to, { overwrite: true })
                return
            } else {
                log.print(
                    `Skip existing config file: ${path.relative(
                        CONSUMING_ROOT,
                        to
                    )}`
                )
                return
            }
        } else {
            log.debug('Configuration file added:')
            log.print(`${path.relative(CONSUMING_ROOT, to)}`)
            fs.copySync(from, to, { overwrite: replace })
        }
    } catch (err) {
        log.error(`Failed to install configuration file: ${to}`, err)
    }
}

function deleteFile(fp) {
    try {
        log.debug(`Deleting file: ${fp}`)
        fs.removeSync(fp)
        return true
    } catch (error) {
        log.error('File deletion failed', fp, error)
        return false
    }
}

function selectFiles(files, pattern, staged) {
    let codeFiles = []

    codeFiles = fg.sync(pattern, {
        absolute: true,
        baseNameMatch: true,
        dot: true,
        globstar: true,
        onlyFiles: true,
        ignore: blacklist.map((b) => `**/${b}/**`),
        cwd: PROJECT_ROOT,
    })

    log.debug(`Using pattern: ${pattern}`)
    log.debug(`Matched files: ${codeFiles.join(', ')}`)

    if (files.length > 0) {
        codeFiles = codeFiles
            .filter((f) => mm.contains(f, files))
            .map((f) => path.resolve(f))
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
        const staged = output
            .split('\n')
            .map((f) => path.resolve(CONSUMING_ROOT, f))

        return files.filter((f) => staged.includes(f))
    }

    return []
}

const pickFirstExists = (files = [], customRoot) => {
    for (const file of files) {
        const fp = customRoot
            ? path.join(customRoot, file)
            : path.join(CONSUMING_ROOT, file)

        const exists = fileExists(fp)

        if (exists) {
            log.debug(`Using ${fp} as the common ignore file.`)
            return fp
        }
    }

    return null
}

const fileExists = (fp) => fs.existsSync(fp) && fs.statSync(fp).size !== 0

const dirExists = (fp) => fs.existsSync(fp) && fs.statSync(fp).isDirectory()

const resolveIgnoreFile = (ignoreFiles = []) => {
    return pickFirstExists([...ignoreFiles, '.d2styleignore', '.gitignore'])
}

const relativePath = (fp) => path.relative(CONSUMING_ROOT, fp)

module.exports = {
    copy,
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
    fileExists,
    dirExists,
    relativePath,
}
