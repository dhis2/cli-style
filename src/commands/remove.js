exports.command = 'remove'

exports.describe = 'Removes specified tool configuration files.'

exports.builder = (yargs) =>
    yargs
        .commandDir('actions')
        .config({
            add: false,
        })
        .example(
            '$0 remove eslint',
            'Removes the project configurationf for ESLint'
        )
        .example(
            '$0 remove git-hook pre-commit',
            'Removes the pre-commit Git hook.'
        )
