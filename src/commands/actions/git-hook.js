const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter
const { husky, supportedHooks } = require('../../tools/husky.js')
const { remove } = require('../../utils/config.js')
const { CONSUMING_ROOT, PROJECT_HOOKS_DIR } = require('../../utils/paths.js')

const defaultCommand = (type) =>
    `echo "To customize this hook, edit ${type} in ${path.relative(
        CONSUMING_ROOT,
        PROJECT_HOOKS_DIR
    )}"\nexit 1`

exports.command = 'git-hook <type> [command]'

exports.desc = 'Add Git Hooks to the project.'

exports.builder = (yargs) =>
    yargs
        .positional('type', {
            describe: 'Git Hook to register a command against.',
            type: 'string',
            choices: supportedHooks,
        })
        .positional('command', {
            describe:
                'The command the hook will trigger. Remember it must be enclosed in quotes.',
            type: 'string',
        })
        .option('overwrite', {
            describe: 'Overwrite the existing configuration.',
            type: 'boolean',
        })
        .example(
            '$0 add git-hook pre-push "yarn test"',
            'Adds a pre-push git hook that runs the command "yarn test".'
        )
        .example(
            '$0 add git-hook pre-commit "yarn d2-style apply --staged"',
            'Applies code style to staged files before committing.'
        )

exports.handler = (argv) => {
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
