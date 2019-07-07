const path = require('path')

const { groups } = require('../src/groups.js')
const { selectFiles } = require('../src/files.js')

const fix = process.env.CLI_STYLE_FIX === 'true'
const stage = process.env.CLI_STYLE_STAGE === 'true'
const all = process.env.CLI_STYLE_ALL === 'true'

const selectedGroups = process.env.CLI_STYLE_GROUPS.split(',')

const tools = {}

selectedGroups.map(g => {
    const { glob, command } = groups[g]
    tools[glob] = command(fix, all, stage)
})

module.exports = tools
