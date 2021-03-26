const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter
const { husky } = require('../../tools/husky.js')
const { remove } = require('../../utils/config.js')
const { CONSUMING_ROOT, PROJECT_HOOKS_DIR } = require('../../utils/paths.js')

const defaultCommand = type =>
    `echo "To customize this hook, edit ${type} in ${path.relative(
        CONSUMING_ROOT,
        PROJECT_HOOKS_DIR
    )}"\nexit 1`

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
    const { add, type, command, overwrite } = argv

    log.info(`git-hook > ${add ? 'add' : 'remove'}`)

    if (add) {
        const cmd = overwrite ? 'set' : 'add'

        husky({
            command: cmd,
            hookType: type,
            hookCmd: command ? command : defaultCommand(type),
        })
    } else {
        const hookFile = path.join(PROJECT_HOOKS_DIR, type)
        remove({ path: hookFile })
    }
}
