const path = require('path')

const { collectFiles, jsFiles } = require('../../files.js')
const log = require('@dhis2/cli-helpers-engine').reporter

const { apply_fmt } = require('../../run-js.js')
const { stage_files, staged_files } = require('../../git.js')

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

    const combined = prettyFiles.filter(violations)

    if (combined.length > 0) {
        log.error(
            `${combined.length} file(s) are in violation of code standards:`
        )
        combined.forEach(f => {
            const p = path.relative(process.cwd(), f.file)
            log.info('')
            log.print(`${p}`)
            f.messages.map(m => log.info(`${m.message}`))
        })

        log.info('')
        process.exit(1)
    }

    if (stage) {
        const filesToStage = combined.map(f => f.file)
        const stagedFiles = stage_files(filesToStage, root_dir)
        log.debug('Staged files', stagedFiles)
    }
}

function violations(file) {
    return file.messages.length > 0
}
