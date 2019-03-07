const { collectFiles, jsFiles } = require('../../files.js')
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
    const prettyFiles = apply_fmt(js)

    if (prettyFiles.length === 0) {
        if (js.length > 0) {
            log.info(`${js.length} file(s) reformatted.`)
        } else {
            log.info('No files to format.')
        }
    }

    configure(root_dir)

    if (stage) {
        const stagedFiles = stage_files(prettyFiles, root_dir)
        log.debug('Staged files', stagedFiles)
    }
}
