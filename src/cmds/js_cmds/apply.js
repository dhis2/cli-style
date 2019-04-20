const path = require('path')

const { collectFiles, jsFiles, writeFile } = require('../../files.js')
const log = require('@dhis2/cli-helpers-engine').reporter

const { apply } = require('../../all-js.js')
const { stage_file, staged_files } = require('../../git.js')

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
    const prettyFiles = apply(js)

    log.debug('jsFiles?', js)
    log.debug('prettyFiles', prettyFiles)

    const messages = prettyFiles.filter(f => f.messages.length > 0)

    if (messages.length > 0) {
        log.error(
            `${messages.length} file(s) are in violation of code standards:`
        )
        messages.forEach(f => {
            const p = path.relative(process.cwd(), f.file)
            log.info('')
            log.print(`${p}`)
            f.messages.map(m => log.info(`${m.message}`))
        })

        log.info('')
        process.exit(1)
    }

    const autofix = prettyFiles
        .filter(f => f.output)
        .map(f => {
            const success = writeFile(f.file, f.output)

            if (!success) {
                log.error(`Failed to write ${f.name} to disk`)
                process.exit(1)
            }

            if (stage) {
                stage_file(f.file, root_dir)
            }

            return f
        })

    log.debug(`${autofix.length} file(s) auto fixed.`)
    process.exit(0)
}
