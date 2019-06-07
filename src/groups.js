const path = require('path')
const fs = require('fs-extra')

const tool = t => require(path.join(__dirname, 'tools', t)).runner
const tools = {
    js: tool('js'),
    //git: tool('git'),
    package: tool('package'),
}

const groups = {
    //git: [tools.git],

    js: [tools.js],

    package: [tools.package],

    all: Object.values(tools),
}

function isValidGroup(group) {
    return groups.hasOwnProperty(group)
}

module.exports = {
    tools,
    groups,
    isValidGroup,
}
