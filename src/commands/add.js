exports.command = 'add'

exports.describe = 'Add a configuration file for a tool to the project.'

exports.builder = (yargs) =>
    yargs
        .commandDir('actions')
        .config({
            add: true,
        })
        .example(
            '$0 add eslint',
            'Adds the standard ESLint configuration to the project.'
        )
        .example(
            '$0 add eslint react',
            'Adds React specific ESLint configuration to the project.'
        )
        .example(
            '$0 add git-hook pre-push "yarn test"',
            'Adds a pre-push git hook that runs the command "yarn test"'
        )
