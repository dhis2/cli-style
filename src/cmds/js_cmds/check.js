const path = require('path')
const { collectFiles, jsFiles } = require('../../files.js')
const log = require('@dhis2/cli-helpers-engine').reporter

const { check } = require('../../all-js.js')
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

    if (js.length === 0) {
        log.info('No files to check.')
        process.exit(0)
    }

    const report = check(js)
    const messages = report.filter(f => f.messages.length > 0)

    if (messages.length > 0) {
        log.error(`${messages.length} file(s) violate the code standards:`)
        messages.forEach(f => {
            const p = path.relative(process.cwd(), f.file)
            log.info('')
            log.print(`${p}`)
            f.messages.map(m => log.info(`[${m.checker}] ${m.message}`))
        })
        log.info('')
        process.exit(1)
    } else {
        log.info(`${report.length} file(s) pass the style checks.`)
        process.exit(0)
    }
}
