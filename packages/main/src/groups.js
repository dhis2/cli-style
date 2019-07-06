const path = require('path')
const fs = require('fs-extra')

const tool = t => require(path.join(__dirname, 'tools', t)).runner
const tools = {
    js: tool('js'),
    //git: tool('git'),
    package: tool('package'),
}

const configDir = path.join(__dirname, '..', 'config')

const groups = {
    //git: [tools.git],

    repo: {
        tools: [],
        configs: [
            [
                path.join(configDir, 'editorconfig.config.rc'),
                path.join('.editorconfig'),
            ],
            [
                path.join(configDir, 'github/dependabot.yml'),
                path.join('.dependabot', 'config.yml'),
            ],
            [
                path.join(configDir, 'github/stale.yml'),
                path.join('.github', 'stale.yml'),
            ],
            [
                path.join(configDir, 'github/semantic.yml'),
                path.join('.github', 'semantic.yml'),
            ],
        ],
    },

    js: {
        tools: [tools.js],
        configs: [
            [
                path.join(configDir, 'js/eslint.config.js'),
                path.join('.eslintrc.js'),
            ],
            [
                path.join(configDir, 'js/prettier.config.js'),
                path.join('.prettierrc.js'),
            ],
            [
                path.join(configDir, 'js/browserslist.config.rc'),
                path.join('.browserslistrc'),
            ],
            [
                path.join(configDir, 'commitlint.config.js'),
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
}
