// support crew
const { collectFiles, whitelisted } = require('../files.js')
const log = require('../log.js')

// heavy lifters
const prettify = require('../prettier.js')
const { stage, staged } = require('../git.js')
const configure = require('../config.js')

// plugin

exports.command = '$0'

exports.describe = 'Format code according to DHIS2 rules.'

exports.builder = {
    all: { boolean: true },
}

exports.handler = function(argv) {
    const { cwd, root_dir, tool, all } = argv

    let codeFiles
    if (all) {
        codeFiles = collectFiles(root_dir).filter(whitelisted)
    } else {
        codeFiles = staged(root_dir).filter(whitelisted)
    }

    // debug information about the folders
    log.debug('rootDir?', root_dir)
    log.debug('cwd?', cwd)
    log.debug('codeFiles?', codeFiles)

    const prettyFiles = prettify(cwd, codeFiles)

    log.debug('Pretty?', prettyFiles)

    configure(cwd, root_dir)

    const stagedFiles = stage(prettyFiles, root_dir)
    log.debug('Staged files', stagedFiles)

    log.info('Code style complete.')
}
