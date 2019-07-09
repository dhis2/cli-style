# cli-style

> This package is part of the [@dhis2/cli](https://github.com/dhis2/cli)
> commandline interface.


[![dhis2-cli Compatible](https://img.shields.io/badge/dhis2-cli-ff69b4.svg)](https://github.com/dhis2/cli)
[![@dhis2/cli-style on npm](https://img.shields.io/npm/v/@dhis2/cli-style.svg)](https://www.npmjs.com/package/@dhis2/cli-style)
[![travis.com build](https://img.shields.io/travis/com/dhis2/cli-style.svg)](https://travis-ci.com/dhis2/cli-style)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

This tool is part of the [dhis2/cli](https://github.com/dhis2/cli)
suite, but can also be used standalone which is useful for project level
integration.

As a terminal user check out the full CLI. :rocket:

## Batteries included

This tool includes the following tools as runtime dependencies, so they
are not necessary to explicitly install:

- [Husky](https://github.com/typicode/husky)
- [Commitlint](https://commitlint.js.org)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io)
- [Lint Staged](https://github.com/okonet/lint-staged)

## Usage

### Install

```sh
yarn add @dhis2/cli-style --dev

# or

npm install @dhis2/cli-style --save-dev
```

### Check out the help for the different commands

```
npx d2-style --help

npx d2-style validate --help
npx d2-style setup --help

npx d2-style js --help
npx d2-style js check --help
npx d2-style js apply --help
```

## Automated setup

`d2-style` can automatically generate the configuration files into the
repository for you. For a list of valid groups run:

```sh
npx d2-style setup
```

The `setup` command works with the notion of groups. To install the
"base" group, which contains the bare essentials you need:

```sh
npx d2-style setup defaults/base
```

If a config file already exists, the tool skips overwriting it, in case
there are local modifications.

To regenerate and overwrite, pass the `--force` flag:

```sh
npx d2-style setup defaults/base --force
```

For a JavaScript project you will very likely want to use the
`defaults/js` group.

```sh
npx d2-style setup defaults/js
```

Which includes a formatter, linter, git hook manager, etc.

## How it works

1. When `d2-style` is installed, Husky installs itself as a Git hook,
   since it is a runtime dependency of `d2-style`.

2. `d2-style setup defaults/base` installs the necessary configuration files in the
   repo. 

3. Now, when a hook is triggered (e.g. `pre-commit`), the `.huskyrc.js`
   configuration is read for that specific hook, and the command is
   executed.

4. In the case of `pre-commit`, the command is `d2-style validate`,
   which resolves the relevant `lint-staged` configuration.

5. `lint-staged` is executed and passes all the _staged_ files matching a
   _glob_ in the lint-staged configuration to the designated command,
   e.g. `d2-style js apply --stage` which will delint JS files and
   automatically apply the fixes, and stage the result.

6. If all goes well, `d2-style js apply --stage` exits with a exit code
   of `0`, which will let lint-staged to continue with matching more
   _globs_ and running additional linters. When everything is good,
   `lint-staged` exits with code `0`.

7. With the default Husky config, the commit message itself will be
   checked using `d2-style commit check` which uses `commitlint`
   internally. If the commit message is valid, it exits with `0`.

8. The commit is created. If at any point a tool exits with a non-zero
   exit code, then the process halts.

## Command chain

1. **Husky** runs `d2-style validate`.

2. `validate` runs **lint-staged**.

3. **lint-staged** runs **linters**.

4. **Husky** runs commit message check: `d2-style commit check`.

## Overrides

There are opportunities to extend and change the behaviour of      
`d2-style`, and because of how the different tools themselves work, the
process varies slightly. Remember how the command chain work, and it is
easier to reason about why.

### Husky

The `base` group installs `.huskyrc.js` in the repository, which looks
like:

```js
module.exports = {
    hooks: {
       'commit-msg': 'd2-style commit check',
       'pre-commit': 'd2-style validate',
    },
}
```

It can also be installed with:

```sh
npx d2-style setup git/husky
```

From here, the commands for each hook and be customized and/or extended.

### Lint Staged

By default, `d2-style` uses the bundled `lint-staged` configuration, so
it is possible to just run `d2-style validate` without having a
configuration file for it in the repository. To override the config, we
must first generate one in the repository:

```sh
npx d2-style setup git/lint-staged
```

Now, in `.lint-stagedrc.js` you can modify the linters to be run and on
which globs. Let's add CSS linting:

```js
const fix = process.env.CLI_STYLE_FIX === 'true'
const stage = process.env.CLI_STYLE_STAGE === 'true'

module.exports = {
    '*.{js,jsx,ts,tsx}': [
        `d2-style js ${fix ? 'apply' : 'check'} ${
            fix && stage ? '--stage' : ''
        }`,
    ],
    '*.css': [
        'stylelint',
        'git add',
    ]
}
```

The environment variables `CLI_STYLE_*` are set by the `validate`
command, so they can be safely read in `.lint-stagedrc.js`. Note that
you should always run `d2-style validate`, and not `lint-staged`
directly.

Now we have to tell Husky to tell `d2-style validate` to use our custom
`lint-staged` configuration, so in `.huskyrc.js` we can update the
`pre-commit` hook:

```js
'pre-commit': 'd2-style validate --lint-staged-config .lint-stagedrc.js',
```

We do not automatically look for a configuration file in the current
working directory as that can lead to unexpected results when using the
`d2-style` command globally.

### ESLint

`d2-style`'s ESLint configuration is barebones for a reason. JavaScript
is used in many different environments and tool chains for the front-end
and back-end which all require different linters.

The scope of the base ESLint config is to include general JavaScript
rules, which we have decided on, most often as a result of the [decision
process](https://github.com/dhis2/notes/#discussion-board).

It doesn't make sense to include `d2-style` _and_ ESlint in the same
project, which can lead to strange dependency resolution issues, and
differences in the configuration format.

As the other tools, `d2-style` by default uses the bundled ESLint
configuration as its
[`baseConfig`](https://eslint.org/docs/developer-guide/nodejs-api#cliengine),
and allows a user to extend the configuration in two different ways.

Let's start with the most common one, and install the local
`.eslintrc.js` config file into our repo.

```sh
npx d2-style setup linter/eslint
```

This gives us a very basic configuration file, which doesn't do much.

```js
module.exports = {
    extends: [],
}
```

From here, if you are using Babel to transpile your modern JavaScript,
you will probably need to use `babel-eslint` with ESLint to parse and
lint your code, so let's set that up.

The errors I got looked like:

```sh
src/Tabs/ScrollBar.js
Line 10: Parsing error: Unexpected token =
```

```sh
# assuming you already use babel we only need babel-eslint

yarn add --dev babel-eslint
```

Now update the `.eslintrc.js` file to use the new parser:

```js
module.exports = {
    parser: 'babel-eslint',
}
```

And run `d2-style` again:

```sh
npx d2-style js check --all
119 javascript file(s) checked.
```

You can install plugins, extend presets, etc. and `d2-style` will do its
best to resolve them to the repository's `node_modules/` directory. If
it fails to parse your custom `.eslintrc.js` file, it will fall back to
its internal configuration files.

See [configuring ESLint](https://eslint.org/docs/user-guide/configuring)
for more information on how to configure ESLint.

Also, please note that if you already have a `.eslintrc.*` file,
`d2-style` will pick that up according to the priority defined in
ESLint, which might give you surprising results, so make sure you only
have one.

### Prettier

#### N.B. Do not override the Prettier configuration for core apps and libraries!

There should be little reason to modify the Prettier configuration,
though there is an escape hatch if need be:

```
npx d2-style setup formatter/prettier
```

This generates a `.prettierrc.js` file for you with the contents:

```js
module.exports = {
    ...require('@dhis2/cli-style/config/js/prettier.config.js'),
}
```

From here, you can add your overrides under the base configuration:

```js
module.exports = {
    ...require('@dhis2/cli-style/config/js/prettier.config.js'),
    // overrides go below here
    semi: true,
}
```

Now you can update your `.huskyrc.js` line where you call `d2-style
validate` to:

```js
'pre-commit': 'd2-style validate --prettier-config .prettierrc.js',
```

Your custom Prettier config will be used to format code when `validate`
runs.
