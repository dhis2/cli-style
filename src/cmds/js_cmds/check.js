const { collectFiles, whitelisted } = require('../../files.js')
const log = require('@dhis2/cli-helpers-engine').reporter

const { check_fmt } = require('../../prettier.js')
const { staged_files } = require('../../git.js')

const configure = require('../../config.js')

exports.command = 'check [files..]'

exports.describe = 'Check JS format.'

exports.builder = {
    all: {
        describe:
            'Default behaviour is to only format files staged with Git, use this option to format all files.',
        type: 'boolean',
        default: 'false',
    },
}

exports.handler = argv => {
    const { all, files } = argv
    const root_dir = process.cwd()

    let codeFiles
    if (all) {
        codeFiles = collectFiles(root_dir).filter(whitelisted)
    } else if (files) {
        codeFiles = files
    } else {
        codeFiles = staged_files(root_dir).filter(whitelisted)
    }

    // debug information about the folders
    log.debug('rootDir?', root_dir)
    log.debug('codeFiles?', codeFiles)

    const prettyFiles = check_fmt(codeFiles)

    prettyFiles.length > 0
        ? log.info(`Files to style:\n${prettyFiles.join('\n')}`)
        : log.info('No files to style.')
}
