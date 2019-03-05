const path = require('path')
const { collectJsFiles, whitelists, whitelisted } = require('../../files.js')
const log = require('@dhis2/cli-helpers-engine').reporter

const { check_fmt } = require('../../prettier.js')
const { staged_files } = require('../../git.js')

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
        codeFiles = collectJsFiles(root_dir)
    } else if (files) {
        codeFiles = files
    } else {
        const whitelist = whitelisted(whitelists.js)
        codeFiles = staged_files(root_dir).filter(whitelist)
    }

    // debug information about the folders
    log.debug('rootDir?', root_dir)
    log.debug('codeFiles?', codeFiles)

    const prettyFiles = check_fmt(codeFiles)

    const success = prettyFiles.length > 0

    if (success) {
        log.info(`Files to style:`)
        prettyFiles.forEach(f =>
            log.print(`\t${path.relative(process.cwd(), f)}`)
        )
        log.error('One or more files failed the style check')
        process.exit(1)
    } else {
        log.info('No files to style.')
        process.exit(0)
    }
}
