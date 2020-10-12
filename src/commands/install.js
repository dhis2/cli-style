const inquirer = require('inquirer')
const log = require('@dhis2/cli-helpers-engine').reporter

const { configure } = require('../utils/config.js')
const { printGroups, projects } = require('../utils/groups.js')

exports.command = 'install [group..]'

exports.describe = 'Install DHIS2 configurations for a/all group(s)'

exports.builder = {
    force: {
        describe: 'Overwrites existing configuration',
        type: 'boolean',
        default: 'false',
    },
    listGroups: {
        describe: 'List available groups',
        type: 'boolean',
        default: 'false',
    },
}

exports.handler = async argv => {
    if (argv.listGroups) {
        log.print(printGroups())
        process.exit(0)
    }

    const prompt = inquirer.createPromptModule()

    const { force, group } = argv

    const root = process.cwd()

    let choice

    if (!group) {
        const res = await prompt([
            {
                name: 'project',
                message: 'Choose the project template',
                type: 'list',
                choices: () => projects.map(a => a[0]),
            },
        ])

        choice = [`project/${res.project}`]
    } else {
        choice = group
    }

    configure(root, choice, force)
}
