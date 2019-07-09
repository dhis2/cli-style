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

    LOCAL_PRETTIER_CONFIG,
    LOCAL_ESLINT_CONFIG,
} = require('./paths.js')

const linter = {
    'linter/eslint': {
        configs: [[LOCAL_ESLINT_CONFIG, path.join('.eslintrc.js')]],
    },
}

const formatter = {
    'formatter/prettier': {
        configs: [[LOCAL_PRETTIER_CONFIG, path.join('.prettierrc.js')]],
    },
}

const git = {
    'git/husky': {
        configs: [[HUSKY_CONFIG, path.join('.huskyrc.js')]],
    },

    'git/lint-staged': {
        configs: [[LINT_STAGED_CONFIG, path.join('.lint-stagedrc.js')]],
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
    'base/editorconfig': {
        configs: [[EDITORCONFIG_CONFIG, path.join('.editorconfig')]],
    },

    'base/browserslist': {
        configs: [[BROWSERSLIST_CONFIG, path.join('.browserslistrc')]],
    },
}

// setup the groups which can be targeted by `d2-style setup`
const groups = {
    ...base,
    ...formatter,
    ...git,
    ...github,
    ...linter,
}

groups['defaults/all'] = {
    configs: Object.values(groups)
        .map(t => t.configs)
        .reduce((a, b) => a.concat(b), []),
}

groups['defaults/js'] = {
    configs: Object.keys(groups)
        .map(t =>
            [
                'base/editorconfig',
                'base/browserslist',
                'linter/eslint',
                'formatter/prettier',
                'git/husky',
                'github/dependabot',
                'github/probot-stale',
                'github/probot-semantic-pull-requests',
            ].includes(t)
                ? groups[t].configs
                : []
        )
        .reduce((a, b) => a.concat(b), []),
}

groups['defaults/base'] = {
    configs: Object.keys(groups)
        .map(t => (Object.keys(base).includes(t) ? groups[t].configs : []))
        .reduce((a, b) => a.concat(b), []),
}

groups['defaults/github'] = {
    configs: Object.keys(groups)
        .map(t => (Object.keys(github).includes(t) ? groups[t].configs : []))
        .reduce((a, b) => a.concat(b), []),
}

groups['defaults/git'] = {
    configs: Object.keys(groups)
        .map(t => (Object.keys(git).includes(t) ? groups[t].configs : []))
        .reduce((a, b) => a.concat(b), []),
}

groups['defaults/linters'] = {
    configs: Object.keys(groups)
        .map(t => (Object.keys(linter).includes(t) ? groups[t].configs : []))
        .reduce((a, b) => a.concat(b), []),
}

groups['defaults/formatters'] = {
    configs: Object.keys(groups)
        .map(t => (Object.keys(formatter).includes(t) ? groups[t].configs : []))
        .reduce((a, b) => a.concat(b), []),
}

const isValidGroup = group => groups.hasOwnProperty(group)

module.exports = {
    groups,
    isValidGroup,
}
