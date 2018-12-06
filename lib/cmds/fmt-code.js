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
            `could not find 'node_modules/@dhis2/code-style' in ${process.cwd()}`,
            err
        )
        return process.cwd()
    }
}

// plugin
exports.command = '$0'

exports.describe = 'Format code according to DHIS2 rules.'

exports.builder = {
    all: { boolean: true },
}

exports.handler = function(argv) {
    const { root_dir, tool, all } = argv
    const dep_dir = cwd()

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

    const prettyFiles = prettify(dep_dir, codeFiles)

    log.debug('Pretty?', prettyFiles)

    configure(dep_dir, root_dir)

    const stagedFiles = stage(prettyFiles, root_dir)
    log.debug('Staged files', stagedFiles)

    log.info('Code style complete.')
}
