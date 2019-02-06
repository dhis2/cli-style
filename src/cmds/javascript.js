// built-ins
const path = require('path')
const fs = require('fs')

// support crew
const { collectFiles, whitelisted } = require('../files.js')
const log = require('../log.js')

// heavy lifters
const prettify = require('../prettier.js')
const { stage, staged } = require('../git.js')
const configure = require('../config.js')

function cwd() {
    try {
        const nodeModulePath = path.join(
            process.cwd(),
            'node_modules',
            '@dhis2',
            'code-style'
        )
        fs.accessSync(nodeModulePath)
        return nodeModulePath
    } catch (err) {
        log.error(
            `could not find 'node_modules/@dhis2/code-style' in '${process.cwd()}', falling back to latter.`
        )
        return process.cwd()
    }
}

// plugin
exports.command = 'js <action>'

exports.describe = 'Format javascript according to standards'

exports.builder = yargs => {
    yargs
        .positional('action', {
            describe: 'Print the changes to stdout or apply them to your files',
            choices: ['check', 'apply'],
            type: 'string',
        })
        .option('all', {
            describe: 'If set scans all files, default is to scan staged files',
            default: false,
            type: 'boolean',
        })
}

exports.handler = function(argv) {
    const { all, action } = argv
    const root_dir = process.cwd()
    const dep_dir = cwd()

    const check = action === 'check'
    const apply = action === 'apply'

    let codeFiles
    if (all) {
        codeFiles = collectFiles(root_dir).filter(whitelisted)
    } else {
        codeFiles = staged(root_dir).filter(whitelisted)
    }

    // debug information about the folders
    log.debug('rootDir?', root_dir)
    log.debug('depDir?', dep_dir)
    log.debug('codeFiles?', codeFiles)

    const prettyFiles = prettify(dep_dir, codeFiles, check)

    if (apply) {
        log.debug('Pretty?', prettyFiles)

        configure(dep_dir, root_dir)

        const stagedFiles = stage(prettyFiles, root_dir)
        log.debug('Staged files', stagedFiles)
    }
}
