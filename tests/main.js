const test = require('tape')
const { command, config } = require('../index.js')

test('base exports are objects', (t) => {
    t.plan(2)

    t.ok(typeof command === 'object')
    t.ok(typeof config === 'object')
})
