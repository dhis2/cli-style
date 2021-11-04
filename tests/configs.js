const path = require('path')
const test = require('tape')
const { config } = require('../index.js')

test('prettier config resolves to non-empty object', (t) => {
    t.plan(1)

    const loaded = require(config.prettier)
    t.notDeepEqual(loaded, {})
})

test('eslint config resolves to non-empty object', (t) => {
    t.plan(1)

    const loaded = require(config.eslint)
    t.notDeepEqual(loaded, {})
})

test('config files reference paths', (t) => {
    const count = Object.keys(config).length
    t.plan(count * 2)

    for (const cfg in config) {
        t.ok(path.isAbsolute(config[cfg]))
        t.ok(typeof config[cfg] === 'string')
    }
})
