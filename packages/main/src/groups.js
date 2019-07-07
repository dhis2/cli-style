const path = require('path')
const fs = require('fs-extra')

const configDir = path.join(__dirname, '..', 'config')

const gitAdd = `git add`

const groups = {
    //git: [tools.git],

    repo: {
        configs: [
            [
                path.join(configDir, 'editorconfig.config.rc'),
                path.join('.editorconfig'),
            ],
            [
                path.join(configDir, 'github', 'dependabot.yml'),
                path.join('.dependabot', 'config.yml'),
            ],
            [
                path.join(configDir, 'github', 'stale.yml'),
                path.join('.github', 'stale.yml'),
            ],
            [
                path.join(configDir, 'github', 'semantic.yml'),
                path.join('.github', 'semantic.yml'),
            ],
        ],
    },

    js: {
        glob: '*.{js,jsx,ts,tsx}',
        command: (fix, all, stage) => {
            const prettierCmd = `prettier ${
                fix ? '--write' : '--check'
            } --config ${path.join(configDir, 'js', 'prettier.config.js')}`

            const eslintCmd = `eslint ${
                fix ? '--fix' : ''
            } --config ${path.join(configDir, 'js', 'eslint.config.js')}`

            return [prettierCmd, eslintCmd, ...(stage ? [gitAdd] : [])]
        },
        configs: [
            [
                path.join(configDir, 'js', 'eslint.config.js'),
                path.join('.eslintrc.js'),
            ],
            [
                path.join(configDir, 'js', 'prettier.config.js'),
                path.join('.prettierrc.js'),
            ],
            [
                path.join(configDir, 'js', 'browserslist.config.rc'),
                path.join('.browserslistrc'),
            ],
            [
                path.join(configDir, 'commitlint.config.js'),
                path.join('.commitlintrc.js'),
            ],
        ],
    },

    package: {
        configs: [],
    },
}

groups.all = {
    commands: null,
    configs: Object.values(groups)
        .map(t => t.configs)
        .reduce((a, b) => a.concat(b), []),
}

const isValidGroup = group => groups.hasOwnProperty(group)

module.exports = {
    groups,
    isValidGroup,
}
