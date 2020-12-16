const path = require('path')
const {
    BROWSERSLIST_CONFIG,
    ESLINT_CONFIG,
    ESLINT_REACT_CONFIG,
    HUSKY_CONFIG,
    PRETTIER_CONFIG,
    STALE_CONFIG,
    DEPENDABOT_CONFIG,
    EDITORCONFIG_CONFIG,
    SEMANTIC_PR_CONFIG,
    LOCAL_ESLINT_REACT_CONFIG,
    LOCAL_PRETTIER_CONFIG,
    LOCAL_ESLINT_CONFIG,
    LOCAL_HUSKY_CONFIG,
    LOCAL_HUSKY_FRONTEND_CONFIG,
} = require('./paths.js')

/**
 * The group definitions for what configuration files can be installed
 * with `d2-style` setup.
 *
 * The format of a selector is: 'identifier/specifier', e.g.
 *
 * git/husky
 *
 * This is represented by a multi-dimensional array:
 *
 * [ identifier, [
 *   [ specifier_one, configuration_files ],
 *   [ specifier_two, configuration_files ],
 * ]
 *
 * configuration_files is also expected to be an array with the format:
 *
 * [ bundled_config_file, target_config_file ]
 *
 * The first slot in the array describes the configuration file which is
 * bundled, and the second slot to where the bundled configuration file
 * should be installed.
 *
 */
const groups = [
    [
        'linter',
        [
            ['eslint', [LOCAL_ESLINT_CONFIG, path.join('.eslintrc.js')]],
            [
                'eslint-react',
                [LOCAL_ESLINT_REACT_CONFIG, path.join('.eslintrc.js')],
            ],
        ],
    ],
    [
        'formatter',
        [['prettier', [LOCAL_PRETTIER_CONFIG, path.join('.prettierrc.js')]]],
    ],
    [
        'git',
        [
            ['husky', [LOCAL_HUSKY_CONFIG, path.join('.huskyrc.js')]],
            [
                'husky-frontend',
                [LOCAL_HUSKY_FRONTEND_CONFIG, path.join('.huskyrc.js')],
            ],
        ],
    ],
    [
        'github',
        [
            [
                'dependabot',
                [DEPENDABOT_CONFIG, path.join('.github', 'dependabot.yml')],
            ],
            ['probot-stale', [STALE_CONFIG, path.join('.github', 'stale.yml')]],
            [
                'probot-semantic-pull-requests',
                [SEMANTIC_PR_CONFIG, path.join('.github', 'semantic.yml')],
            ],
        ],
    ],
    [
        'tools',
        [
            ['editorconfig', [EDITORCONFIG_CONFIG, path.join('.editorconfig')]],
            [
                'browserslist',
                [BROWSERSLIST_CONFIG, path.join('.browserslistrc')],
            ],
        ],
    ],
]

/**
 * Projects follow a simpler structure, where the selector is assumed to
 * always be 'projects', so the 'identifier' is moved up to the same
 * level as group in the `groups` definition.
 *
 * Another difference is that a project just defines the selectors it
 * wants to bundle, acting as a short-hand.
 */
const projects = [
    ['base', ['tools/editorconfig', 'git/husky']],
    [
        'js',
        [
            'tools/all',
            'github/all',
            'linter/eslint',
            'formatter/prettier',
            'git/husky-frontend',
        ],
    ],
    [
        'react',
        [
            'base/all',
            'github/all',
            'linter/eslint-react',
            'formatter/prettier',
            'git/husky-frontend',
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
    // eslint-disable-next-line no-unused-vars
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

/**
 * Returns an object which contains the bundled configuration file for
 * each tool in cli-style
 */
const bundledConfigPaths = () => {
    const config = {}

    for (const selector of groups) {
        // eslint-disable-next-line no-unused-vars
        const groupName = selector[0]
        const tools = selector[1]

        for (const identifier of tools) {
            const toolName = identifier[0]
            const toolConfigs = identifier[1]
            const sourceConfigPath = toolConfigs[0]

            switch (toolName) {
                /* Some tools have two configs, e.g. `*.config.js` and `*.local.js`.
                 * Usually we want the local configuration (see the
                 * groups array) since that is what we install to the
                 * local repo, but in this case we need the internal
                 * configuration file path, so we need to override it
                 * here.
                 */
                case 'prettier':
                    config.prettier = PRETTIER_CONFIG
                    break
                case 'eslint':
                    config.eslint = ESLINT_CONFIG
                    break
                case 'eslint-react':
                    config.eslintReact = ESLINT_REACT_CONFIG
                    config['eslint-react'] = ESLINT_REACT_CONFIG
                    break
                case 'husky':
                    config.husky = HUSKY_CONFIG
                    break
                default:
                    config[toolName] = sourceConfigPath
                    break
            }
        }
    }

    return config
}

module.exports = {
    groups,
    projects,
    expandGroupAll,
    isValidGroup,
    isValidProject,
    resolveProjectToGroups,
    printGroups,
    groupConfigs,
    bundledConfigPaths,
    projectConfigs,
}
