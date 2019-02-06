// built-ins
const path = require('path')
const fs = require('fs')

// support crew
const { collectFiles, whitelisted } = require('../files.js')
const log = require('@dhis2/cli-helpers-engine').reporter

// heavy lifters
const prettify = require('../prettier.js')
const { stage, staged } = require('../git.js')
const configure = require('../config.js')

function cwd() {
    try {
        const nodeModulePath = path.join(
            process.cwd(),
            'node_modules',
            '@dhis2',
            'code-style'
        )
        fs.accessSync(nodeModulePath)
        return nodeModulePath
    } catch (err) {
        log.error(
            `could not find 'node_modules/@dhis2/code-style' in '${process.cwd()}', falling back to latter.`
        )
        return process.cwd()
    }
}

// plugin
exports.command = 'js <cmd>'

exports.describe = 'Format javascript according to standards'

exports.builder = {
    cmd: {
        describe: 'check or apply style',
        choices: ['check', 'apply'],
        type: 'string',
    },
    all: {
        type: 'boolean',
        default: false,
        describe:
            'default is to only check staged files, use this to check all files',
    },
}

exports.handler = function(argv) {
    const { all, cmd } = argv
    const root_dir = process.cwd()
    const dep_dir = cwd()

    const check = cmd === 'check'
    const apply = cmd === 'apply'

    let codeFiles
    if (all) {
        codeFiles = collectFiles(root_dir).filter(whitelisted)
    } else {
        codeFiles = staged(root_dir).filter(whitelisted)
    }

    // debug information about the folders
    log.debug('rootDir?', root_dir)
    log.debug('depDir?', dep_dir)
    log.debug('codeFiles?', codeFiles)

    const prettyFiles = prettify(dep_dir, codeFiles, check)

    prettyFiles.length > 0
        ? log.info(`Files to style:\n${prettyFiles.join('\n')}`)
        : log.info('No files to style.')

    if (apply) {
        configure(dep_dir, root_dir)

        const stagedFiles = stage(prettyFiles, root_dir)
        log.debug('Staged files', stagedFiles)
    }
}
