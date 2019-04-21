const path = require('path')

const { collectFiles, jsFiles, writeFile } = require('../../files.js')
const log = require('@dhis2/cli-helpers-engine').reporter

const { apply } = require('../../all-js.js')
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
    const root = process.cwd()
    log.debug(`Root directory: ${root}`)

    let codeFiles
    if (all) {
        codeFiles = collectFiles(root)
    } else if (files) {
        codeFiles = files
    } else {
        codeFiles = staged_files(root)
    }

    const js = jsFiles(codeFiles)
    log.debug(`Files to operate on:\n${js}`)

    const report = apply(js)
    const messages = report.filter(f => f.messages.length > 0)

    if (messages.length > 0) {
        log.error(`${messages.length} file(s) violate the code standards:`)
        messages.forEach(f => {
            const p = path.relative(process.cwd(), f.file)
            log.info('')
            log.print(`${p}`)
            f.messages.map(m => log.info(`${m.message}`))
        })

        log.info('')
        process.exit(1)
    }

    const autofix = report
        .filter(f => f.output)
        .map(f => {
            const success = writeFile(f.file, f.output)
            log.debug(`${f.file} written successfully: ${success}`)

            if (!success) {
                log.error(`Failed to write ${f.name} to disk`)
                process.exit(1)
            }

            return f.file
        })

    log.info(`${autofix.length} file(s) automatically fixed.`)

    if (stage) {
        stage_files(autofix, root)
    }

    process.exit(0)
}
