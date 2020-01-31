# Configuration overrides

Sometimes you need to override some settings. It should be used
sparingly as custom style settings runs counter to the goal of a
consistent style.

Never-the-less. It can be done.

## General

We defer to the local configuration files for each tool, so
customizations there will be respected when running `d2-style`.

## Prettier

In your project you should have a `.prettierrc.js` file if you used the
`install` command to set up `d2-style`. In it, you can add any custom
options _after_ the `...require(config.prettier)` line. For example to
have semi colons enabled:

```js
const { config } = require('./index.js')

module.exports = {
    ...require(config.prettier),
    semi: true,
}
```

## ESLint

Similar to Prettier, you should have a `.eslintrc.js` file in your
project that you can customize.

E.g. to use another parser, in this case the TypeScript ESLint parser:

```js
const { config } = require('./index.js')

module.exports = {
    extends: [config.eslint],

    env: {
        es6: true,
    },

    parser: '@typescript-eslint/parser',
}
```
