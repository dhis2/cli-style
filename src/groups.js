const path = require('path')
const fs = require('fs-extra')

const {
    BROWSERSLIST_CONFIG,
    COMMITLINT_CONFIG,
    ESLINT_CONFIG,
    PRETTIER_CONFIG,
    STALE_CONFIG,
    DEPENDABOT_CONFIG,
    EDITORCONFIG_CONFIG,
    SEMANTIC_PR_CONFIG,
} = require('./config.js')

const tool = t => `node ${path.join(__dirname, 'tools', 'cli.js')} ${t}`
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
            [EDITORCONFIG_CONFIG, path.join('.editorconfig')],
            [DEPENDABOT_CONFIG, path.join('.dependabot', 'config.yml')],
            [STALE_CONFIG, path.join('.github', 'stale.yml')],
            [SEMANTIC_PR_CONFIG, path.join('.github', 'semantic.yml')],
        ],
    },

    js: {
        tools: [`${tools.js}`],
        configs: [
            [ESLINT_CONFIG, path.join('.eslintrc.js')],
            [PRETTIER_CONFIG, path.join('.prettierrc.js')],
            [BROWSERSLIST_CONFIG, path.join('.browserslistrc')],
            [COMMITLINT_CONFIG, path.join('.commitlintrc.js')],
        ],
    },

    package: {
        tools: [`${tools.package}`],
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
