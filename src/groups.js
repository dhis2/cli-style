const path = require('path')
const fs = require('fs-extra')

const tool = t => `node ${path.join(__dirname, 'tools', 'cli.js')} ${t}`
const tools = {
    js: tool('js'),
    //git: tool('git'),
    package: tool('package'),
}

const CONFIG_ROOT = path.join(__dirname, '..')
const CONFIG_DIR = path.join(CONFIG_ROOT, 'config')

const groups = {
    //git: [tools.git],

    repo: {
        tools: [],
        configs: [
            [
                path.join(__dirname, '../config/editorconfig.config.rc'),
                path.join('.editorconfig'),
            ],
            [
                path.join(__dirname, '../config/github/dependabot.yml'),
                path.join('.dependabot', 'config.yml'),
            ],
            [
                path.join(__dirname, '../config/github/stale.yml'),
                path.join('.github', 'stale.yml'),
            ],
            [
                path.join(__dirname, '../config/github/semantic.yml'),
                path.join('.github', 'semantic.yml'),
            ],
        ],
    },

    js: {
        tools: [`${tools.js}`],
        configs: [
            [
                path.join(__dirname, '../config/js/eslint.config.js'),
                path.join('.eslintrc.js'),
            ],
            [
                path.join(__dirname, '../config/js/prettier.config.js'),
                path.join('.prettierrc.js'),
            ],
            [
                path.join(__dirname, '../config/js/browserslist.config.rc'),
                path.join('.browserslistrc'),
            ],
            [
                path.join(__dirname, '../config/commitlint.config.js'),
                path.join('.commitlintrc.js'),
            ],
        ],
    },

    package: {
        tools: [tools.package],
        configs: [],
    },
}

groups.all = {
    tools: Object.values(tools),
    configs: Object.values(groups)
        .map(t => t.configs)
        .reduce((a, b) => a.concat(b), []),
}

const isValidGroup = group => groups.hasOwnProperty(group)

module.exports = {
    tools,
    groups,
    isValidGroup,
    CONFIG_DIR,
}