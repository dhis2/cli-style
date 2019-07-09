const path = require('path')
const fs = require('fs-extra')

const {
    BROWSERSLIST_CONFIG,
    COMMITLINT_CONFIG,
    ESLINT_CONFIG,
    HUSKY_CONFIG,
    PRETTIER_CONFIG,
    STALE_CONFIG,
    DEPENDABOT_CONFIG,
    EDITORCONFIG_CONFIG,
    SEMANTIC_PR_CONFIG,
    LINT_STAGED_CONFIG,

    LOCAL_HUSKY_CONFIG,
    LOCAL_PRETTIER_CONFIG,
    LOCAL_ESLINT_CONFIG,
} = require('./paths.js')

const groups = {
    repo: {
        configs: [
            [EDITORCONFIG_CONFIG, path.join('.editorconfig')],
            [DEPENDABOT_CONFIG, path.join('.dependabot', 'config.yml')],
            [STALE_CONFIG, path.join('.github', 'stale.yml')],
            [SEMANTIC_PR_CONFIG, path.join('.github', 'semantic.yml')],
        ],
    },

    js: {
        configs: [
            [LOCAL_HUSKY_CONFIG, path.join('.huskyrc.js')],
            [LOCAL_ESLINT_CONFIG, path.join('.eslintrc.js')],
            [LOCAL_PRETTIER_CONFIG, path.join('.prettierrc.js')],
            [BROWSERSLIST_CONFIG, path.join('.browserslistrc')],
            [COMMITLINT_CONFIG, path.join('.commitlintrc.js')],
            [LINT_STAGED_CONFIG, path.join('.lint-stagedrc.js')],
        ],
    },
}

groups.all = {
    configs: Object.values(groups)
        .map(t => t.configs)
        .reduce((a, b) => a.concat(b), []),
}

const isValidGroup = group => groups.hasOwnProperty(group)

module.exports = {
    groups,
    isValidGroup,
}
