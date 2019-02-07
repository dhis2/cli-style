const { cwd, collectFiles, whitelisted } = require('../../files.js')
const log = require('@dhis2/cli-helpers-engine').reporter

const { apply_fmt } = require('../../prettier.js')
const { stage, staged } = require('../../git.js')

const configure = require('../../config.js')

exports.command = 'apply'

exports.describe = 'Apply JS format.'

exports.builder = {
    all: {
        type: 'boolean',
        default: 'false',
    },
    staged: {
        type: 'boolean',
        default: 'true',
    },
}

exports.handler = argv => {
    const { all } = argv
    const root_dir = process.cwd()

    let codeFiles
    if (all) {
        codeFiles = collectFiles(root_dir).filter(whitelisted)
    } else {
        codeFiles = staged(root_dir).filter(whitelisted)
    }

    // debug information about the folders
    log.debug('rootDir?', root_dir)
    log.debug('codeFiles?', codeFiles)

    const prettyFiles = apply_fmt(codeFiles)

    if (prettyFiles.length === 0) {
        log.info('No files to style.')
    }

    configure(root_dir)

    const stagedFiles = stage(prettyFiles, root_dir)
    log.debug('Staged files', stagedFiles)
}
