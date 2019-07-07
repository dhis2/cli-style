const path = require('path')

const { groups } = require('../src/groups.js')
const { selectFiles } = require('../src/files.js')

const fix = process.env.CLI_STYLE_FIX === 'true'
const stage = process.env.CLI_STYLE_STAGE === 'true'

const selectedGroups = process.env.CLI_STYLE_GROUPS.split(',')

const tools = {}

module.exports = {
    '*': files => {
        const cmds = selectedGroups
            .map(g => groups[g].tools.map(fn => `${fn} ${fix} ${files}`))
            .reduce((a, b) => a.concat(b), [])
            .concat(stage ? ['git add'] : [])
        return cmds
    },
}
