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

// setup the groups which can be targeted by `d2-style setup`
const groups = [
    ['linter', [['eslint', [LOCAL_ESLINT_CONFIG, path.join('.eslintrc.js')]]]],
    [
        'formatter',
        [['prettier', [LOCAL_PRETTIER_CONFIG, path.join('.prettierrc.js')]]],
    ],
    [
        'git',
        [
            ['husky', [HUSKY_CONFIG, path.join('.huskyrc.js')]],
            [
                'lint-staged',
                [LINT_STAGED_CONFIG, path.join('.lint-stagedrc.js')],
            ],
        ],
    ],
    [
        'github',
        [
            [
                'dependabot',
                [DEPENDABOT_CONFIG, path.join('.dependabot', 'config.yml')],
            ],
            ['probot-stale', [STALE_CONFIG, path.join('.github', 'stale.yml')]],
            [
                'probot-semantic-pull-requests',
                [SEMANTIC_PR_CONFIG, path.join('.github', 'semantic.yml')],
            ],
        ],
    ],
    [
        'base',
        [
            ['editorconfig', [EDITORCONFIG_CONFIG, path.join('.editorconfig')]],
            [
                'browserslist',
                [BROWSERSLIST_CONFIG, path.join('.browserslistrc')],
            ],
        ],
    ],
]

const projects = [
    [
        'js',
        [
            'base/all',
            'github/all',
            'linter/eslint',
            'formatter/prettier',
            'git/husky',
        ],
    ],
]

const isValidGroup = selector => {
    const [identifier, specifier] = selector.split('/')

    for (const group of groups) {
        const groupName = group[0]
        const tools = group[1]

        if (groupName === identifier) {
            if (specifier === 'all') {
                return true
            }

            for (const tool of tools) {
                const toolName = tool[0]
                if (toolName === specifier) {
                    return true
                }
            }
        }
    }

    return false
}

const isValidProject = selector => {
    const [identifier, specifier] = selector.split('/')

    if (identifier === 'project') {
        for (const project of projects) {
            const projectName = project[0]
            if (specifier === projectName) {
                return true
            }
        }

        return false
    }
}

const resolveProjectToGroups = projectName => {
    const [specifier, identifier] = projectName.split('/')
    for (const project of projects) {
        if (project[0] === identifier) {
            return project[1]
        }
    }
    return []
}

const printGroups = () => {
    const allGroups = []

    allGroups.push('Available project templates:')

    for (const project of projects) {
        const projectName = project[0]
        const projectGroups = project[1]

        allGroups.push(
            `* project/${projectName} (includes: ${projectGroups.join(', ')})`
        )
    }

    allGroups.push('')
    allGroups.push('All available groups:')

    for (const group of groups) {
        const groupName = group[0]
        const tools = group[1]

        allGroups.push(`* ${groupName}/all`)

        for (const tool of tools) {
            const toolName = tool[0]
            allGroups.push(`* ${groupName}/${toolName}`)
        }
    }

    return allGroups.join('\n')
}

const projectConfigs = identifier => {
    for (const project of projects) {
        const projectName = project[0]
        const projectGroups = project[1]

        if (projectName === identifier) {
            return projectGroups
        }
    }
}

const expandGroupAll = selector => {
    const [specifier, identifier] = selector.split('/')

    for (const group of groups) {
        const groupName = group[0]
        const tools = group[1]

        if (groupName === specifier) {
            if (identifier === 'all') {
                return tools.map(tool => `${groupName}/${tool[0]}`)
            }
        }
    }

    return [selector]
}

const groupConfigs = selector => {
    const [specifier, identifier] = selector.split('/')

    const result = new Set()

    for (const group of groups) {
        const groupName = group[0]
        const tools = group[1]

        if (groupName === specifier) {
            if (identifier === 'all') {
                tools.map(tool => tool[1]).map(config => result.add(config))
            }

            tools
                .filter(tool => tool[0] === identifier)
                .map(tool => tool[1])
                .map(config => result.add(config))
        }
    }

    return [...result]
}

module.exports = {
    groups,
    expandGroupAll,
    isValidGroup,
    isValidProject,
    resolveProjectToGroups,
    printGroups,
    groupConfigs,
}
