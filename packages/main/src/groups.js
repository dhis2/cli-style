const path = require('path')

const CURRENT_ROOT = path.join(process.cwd())
const CONFIG_ROOT = path.join(__dirname, '..')
const CONFIG_DIR = path.join(CONFIG_ROOT, 'config')

const gitAdd = `git add`

const groups = {
    repo: {
        configs: [
            [
                path.join(CONFIG_DIR, 'editorconfig.config.rc'),
                path.join('.editorconfig'),
            ],
            [
                path.join(CONFIG_DIR, 'github', 'dependabot.yml'),
                path.join('.dependabot', 'config.yml'),
            ],
            [
                path.join(CONFIG_DIR, 'github', 'stale.yml'),
                path.join('.github', 'stale.yml'),
            ],
            [
                path.join(CONFIG_DIR, 'github', 'semantic.yml'),
                path.join('.github', 'semantic.yml'),
            ],
        ],
    },

    js: {
        glob: '*.{js,jsx,ts,tsx}',
        command: (fix, stage) => {
            const prettierCmd = `prettier ${
                fix ? '--write' : '--check'
            } --config ${path.join(CONFIG_DIR, 'js', 'prettier.config.js')}`

            const eslintCmd = `eslint ${
                fix ? '--fix' : ''
            } --config ${path.join(CONFIG_DIR, 'js', 'eslint.config.js')}`

            return [prettierCmd, eslintCmd, ...(stage ? [gitAdd] : [])]
        },
        configs: [
            [
                path.join(CONFIG_DIR, 'js', 'eslint.config.js'),
                path.join('.eslintrc.js'),
            ],
            [
                path.join(CONFIG_DIR, 'js', 'prettier.config.js'),
                path.join('.prettierrc.js'),
            ],
            [
                path.join(CONFIG_DIR, 'js', 'browserslist.config.rc'),
                path.join('.browserslistrc'),
            ],
            [
                path.join(CONFIG_DIR, 'commitlint.config.js'),
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
    CONFIG_DIR,
    CONFIG_ROOT,
    CURRENT_ROOT,
    groups,
    isValidGroup,
}
