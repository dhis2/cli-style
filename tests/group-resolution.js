const test = require('tape')

const {
    groups,
    projects,
    isValidGroup,
    isValidProject,
    resolveProjectToGroups,
    groupConfigs,
    expandGroupAll,
} = require('../src/groups.js')

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
    const projectGroups = projects[0][1]
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
