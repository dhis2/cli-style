const { cwd, collectFiles, whitelisted } = require('../../files.js')
const log = require('@dhis2/cli-helpers-engine').reporter

const { check_fmt } = require('../../prettier.js')
const { staged } = require('../../git.js')

const configure = require('../../config.js')

exports.command = 'check'

exports.describe = 'Check JS format.'

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

    const prettyFiles = check_fmt(codeFiles)

    prettyFiles.length > 0
        ? log.info(`Files to style:\n${prettyFiles.join('\n')}`)
        : log.info('No files to style.')
}
