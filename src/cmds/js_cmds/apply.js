const { collectJsFiles, whitelists, whitelisted } = require('../../files.js')
const log = require('@dhis2/cli-helpers-engine').reporter

const { apply_fmt } = require('../../prettier.js')
const { stage_files, staged_files } = require('../../git.js')

const configure = require('../../config.js')

exports.command = 'apply [files..]'

exports.describe = 'Apply JS format.'

exports.builder = {
    all: {
        describe:
            'Default behaviour is to only format files staged with Git, use this option to format all files.',
        type: 'boolean',
        default: 'false',
    },
    stage: {
        describe:
            'By default the changed files are staged automatically, use `--no-stage` to avoid staging files automatically.',
        type: 'boolean',
        default: 'true',
    },
}

exports.handler = argv => {
    const { all, stage, files } = argv
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

    const prettyFiles = apply_fmt(codeFiles)

    if (prettyFiles.length === 0) {
        log.info('No files to style.')
    }

    configure(root_dir)

    if (stage) {
        const stagedFiles = stage_files(prettyFiles, root_dir)
        log.debug('Staged files', stagedFiles)
    }
}
