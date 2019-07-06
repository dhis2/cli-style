const path = require('path')
const fs = require('fs-extra')

const tool = t => require(path.join(__dirname, 'tools', t)).runner
const tools = {
    js: tool('js'),
    //git: tool('git'),
    package: tool('package'),
}

const groups = {
    //git: [tools.git],

    repo: {
        tools: [],
        configs: [
            [
                path.join('config', 'editorconfig.config.rc'),
                path.join('.editorconfig'),
            ],
            [
                path.join('config', 'github', 'dependabot.yml'),
                path.join('.dependabot', 'config.yml'),
            ],
            [
                path.join('config', 'github', 'stale.yml'),
                path.join('.github', 'stale.yml'),
            ],
            [
                path.join('config', 'github', 'semantic.yml'),
                path.join('.github', 'semantic.yml'),
            ],
        ],
    },

    js: {
        tools: [tools.js],
        configs: [
            [
                path.join('config', 'js', 'eslint-shared.config.js'),
                path.join('.eslintrc.js'),
            ],
            [
                path.join('config', 'js', 'prettier-shared.config.js'),
                path.join('.prettierrc.js'),
            ],
            [
                path.join('config', 'js', 'browserslist.config.rc'),
                path.join('.browserslistrc'),
            ],
            [
                path.join('config', 'commitlint.config.js'),
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
