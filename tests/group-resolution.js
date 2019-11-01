const test = require('tape')

const {
    groups,
    projects,
    isValidGroup,
    isValidProject,
    resolveProjectToGroups,
    groupConfigs,
    expandGroupAll,
    bundledConfigPaths,
} = require('../src/utils/groups.js')

const {
    BROWSERSLIST_CONFIG,
    COMMITLINT_CONFIG,
    HUSKY_CONFIG,
    STALE_CONFIG,
    DEPENDABOT_CONFIG,
    EDITORCONFIG_CONFIG,
    SEMANTIC_PR_CONFIG,
    LINT_STAGED_CONFIG,
    PRETTIER_CONFIG,
    ESLINT_CONFIG,
} = require('../src/utils/paths.js')

function findGroup(identifier) {
    const res = []
    for (const group of groups) {
        const groupName = group[0]
        const tools = group[1]

        if (groupName === identifier) {
            for (const tool of tools) {
                const toolName = tool[0]
                res.push(`${groupName}/${toolName}`)
            }
        }
    }
    return res
}

test('a valid project is accepted', t => {
    t.plan(1)
    const project = 'project/js'
    t.ok(isValidProject(project), `${project} is valid`)
})

test('an invalid project will be rejected', t => {
    t.plan(1)
    const project = 'project/foobar'
    t.notOk(isValidProject(project), `${project} is invalid`)
})

test('a valid group is accepted', t => {
    t.plan(1)
    const group = 'formatter/prettier'
    t.ok(isValidGroup(group), `${group} is valid`)
})

test('an invalid group will be rejected', t => {
    t.plan(1)
    const group = 'myspecialgroup/foobar'
    t.notOk(isValidGroup(group), `${group} is invalid`)
})

test('a valid project can be resolved into groups', t => {
    t.plan(1)
    const project = 'project/js'
    const projectGroups = projects[1][1]
    const resolvedGroups = resolveProjectToGroups(project)

    t.deepEqual(
        projectGroups,
        resolvedGroups,
        'resolved groups should match declared project groups'
    )
})

test('valid groups can be expanded', t => {
    t.plan(1)

    const comboGroup = 'git/all'
    const targetGroups = findGroup('git')
    const expandedGroups = expandGroupAll(comboGroup)

    t.deepEqual(
        expandedGroups,
        targetGroups,
        'a combo group should expand to the comboed groups'
    )
})

test('convert to tool:config object', t => {
    t.plan(9)

    const obj = bundledConfigPaths()

    t.equals(obj.eslint, ESLINT_CONFIG)
    t.equals(obj.husky, HUSKY_CONFIG)
    t.equals(obj.prettier, PRETTIER_CONFIG)
    t.equals(obj['lint-staged'], LINT_STAGED_CONFIG)
    t.equals(obj.dependabot, DEPENDABOT_CONFIG)
    t.equals(obj['probot-stale'], STALE_CONFIG)
    t.equals(obj['probot-semantic-pull-requests'], SEMANTIC_PR_CONFIG)
    t.equals(obj.editorconfig, EDITORCONFIG_CONFIG)
    t.equals(obj.browserslist, BROWSERSLIST_CONFIG)
})
