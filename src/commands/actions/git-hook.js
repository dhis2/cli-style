const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter
const { husky } = require('../../tools/husky.js')
const { deleteFile, fileExists } = require('../../utils/files.js')
const { LOCAL_HOOKS_DIR } = require('../../utils/paths.js')

const addHook = ({ type, command, overwrite }) => {
    const cmd = overwrite ? 'set' : 'add'

    husky({
        command: cmd,
        hookType: type,
        hookCmd: command,
    })
}
const removeHook = ({ type }) => {
    const hookFile = path.join(LOCAL_HOOKS_DIR, type)
    if (fileExists(hookFile)) {
        const result = deleteFile(hookFile)
        result
            ? log.print(`Removed Git hook: ${type}`)
            : log.error(`Failed to remove Git hook: ${type}`)
    } else {
        log.warn(`No such hook exists: ${type}`)
    }
}

exports.command = 'git-hook <type> [command]'

exports.desc = ''

exports.builder = yargs =>
    yargs
        .positional('type', {
            describe: '',
            type: 'string',
        })
        .positional('command', {
            describe: '',
            type: 'string',
        })
        .option('overwrite', {
            describe: '',
            type: 'boolean',
        })

exports.handler = argv => {
    log.info(`git-hook > husky`)

    const { add } = argv

    if (add) {
        addHook(argv)
    } else {
        removeHook(argv)
    }
}
