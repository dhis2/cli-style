const log = require('@dhis2/cli-helpers-engine').reporter
const inquirer = require('inquirer')

const { configure } = require('../utils/config.js')
const { printGroups, projects } = require('../utils/groups.js')

const promptForProject = async () => {
    const res = await inquirer.prompt([
        {
            name: 'project',
            message: 'Choose the project template',
            type: 'list',
            choices: () => projects.map(a => a[0]),
        },
    ])
    return [`project/${res.project}`]
}

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

    const force = argv.force
    const group = argv.group || (await promptForProject())

    const root = process.cwd()

    configure(root, group, force)
}
