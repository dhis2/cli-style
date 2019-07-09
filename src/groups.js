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

const js = {
    'js/eslint': {
        configs: [[LOCAL_ESLINT_CONFIG, path.join('.eslintrc')]],
    },

    'js/prettier': {
        configs: [[LOCAL_PRETTIER_CONFIG, path.join('.prettierrc.js')]],
    },
}

const github = {
    'github/dependabot': {
        configs: [[DEPENDABOT_CONFIG, path.join('.dependabot', 'config.yml')]],
    },
    'github/probot-stale': {
        configs: [[STALE_CONFIG, path.join('.github', 'stale.yml')]],
    },
    'github/probot-semantic-pull-requests': {
        configs: [[SEMANTIC_PR_CONFIG, path.join('.github', 'semantic.yml')]],
    },
}

const base = {
    ...github,

    'base/husky': {
        configs: [[LOCAL_HUSKY_CONFIG, path.join('.huskyrc.js')]],
    },

    'base/editorconf': {
        configs: [[EDITORCONFIG_CONFIG, path.join('.editorconfig')]],
    },
}

// setup the groups which can be targeted by `d2-style setup`
const groups = {
    ...js,
    ...base,
    ...github,

    browserslist: {
        configs: [[BROWSERSLIST_CONFIG, path.join('.browserslistrc')]],
    },

    'lint-staged': {
        configs: [[LINT_STAGED_CONFIG, path.join('.lint-stagedrc.js')]],
    },
}

groups.all = {
    configs: Object.values(groups)
        .map(t => t.configs)
        .reduce((a, b) => a.concat(b), []),
}

groups.js = {
    configs: Object.keys(groups)
        .map(t => (Object.keys(js).includes(t) ? groups[t].configs : []))
        .reduce((a, b) => a.concat(b), []),
}

groups.base = {
    configs: Object.keys(groups)
        .map(t => (Object.keys(base).includes(t) ? groups[t].configs : []))
        .reduce((a, b) => a.concat(b), []),
}

const isValidGroup = group => groups.hasOwnProperty(group)

module.exports = {
    groups,
    isValidGroup,
}
