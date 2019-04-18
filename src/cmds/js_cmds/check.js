const path = require('path')
const { collectFiles, jsFiles } = require('../../files.js')
const log = require('@dhis2/cli-helpers-engine').reporter

const { check_fmt } = require('../../run-js.js')
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

    const combined = prettyFiles
        .filter(violations)

    if (combined.length > 0) {
        log.error(`${combined.length} file(s) are in violation of code standards:`)
        combined.forEach(f => {
            const p = path.relative(process.cwd(), f.file)
            log.info('')
            log.print(`${p}`)
            f.messages.map(m => log.info(`${m.message}`))
        })
        log.info('')
        process.exit(1)
    }
}

function violations (file) {
    return file.messages.length > 0
}
