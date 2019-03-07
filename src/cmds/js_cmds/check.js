const path = require('path')
const { collectFiles, jsFiles } = require('../../files.js')
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
        codeFiles = collectFiles(root_dir)
    } else if (files) {
        codeFiles = files
    } else {
        codeFiles = staged_files(root_dir)
    }

    // debug information about the folders
    log.debug('rootDir?', root_dir)
    log.debug('codeFiles?', codeFiles)

    const js = jsFiles(codeFiles)
    const prettyFiles = check_fmt(js)

    const success = prettyFiles.length > 0

    if (success) {
        log.info(`${prettyFiles.length} file(s) needs to be formatted:`)
        prettyFiles.forEach(f =>
            log.print(`${path.relative(process.cwd(), f)}`)
        )
        log.print('')
        process.exit(1)
    } else {
        if (js.length > 0) {
            log.info(`${js.length} file(s) passed the style check.`)
        } else {
            log.info('No files to check.')
        }
        process.exit(0)
    }
}
