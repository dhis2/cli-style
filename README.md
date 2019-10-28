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

-   [Husky](https://github.com/typicode/husky)
-   [Commitlint](https://commitlint.js.org)
-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io)

## Usage

### First time install

```sh
yarn add @dhis2/cli-style --dev

# or

npm install @dhis2/cli-style --save-dev
```

### Check out the help for the different commands

```
npx d2-style --help

npx d2-style install --help

npx d2-style js --help
npx d2-style js check --help
npx d2-style js apply --help
```

### `package.json`

It is recommended to use Git hooks to `check` for style inconsistencies,
but applying the styles and then staging the changes manually. It is
possible to automatically stage after formatting, but it is no longer
provided as out-of-the-box functionality.

Some examples follow:

```
"scripts": {
    "lint:js": "d2-style js check",
    "lint:text": "d2-style text check",
    "lint:staged": "yarn lint:js --staged && yarn lint:text --staged",
    "lint": "yarn lint:js && yarn lint:text",

    "format:js": "d2-style js apply",
    "format:text": "d2-style text apply",
    "format:staged": "yarn format:js --staged && yarn format:text --staged",
    "format": "yarn format:js && yarn format:text"
},
```

## Automated install

`d2-style` can automatically generate the configuration files into the
repository for you. For a list of valid groups run:

```sh
npx d2-style install --list-groups
```

If a config file already exists, the tool skips overwriting it, in case
there are local modifications.

To regenerate and overwrite, pass the `--force` flag:

```sh
npx d2-style install project/base --force
```

## Pre-configured projects

### Base

At the very least you will want to comply with the [conventional
commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
specification and get the standard
[EditorConfig](https://editorconfig.org/):

```
npx d2-style install project/base

# * project/base (includes: tools/editorconfig, git/husky)
```

This gives you a starting point, and after that it is possible to extend
the `.huskyrc.js` configuration with specific hooks, see
[config/husky-frontend.local.js](config/husky-frontend.local.js) for an
example on how to extend the configuration file for Husky.

For example, most repos has structured text in the form of YAML or
Markdown, so adding a pre-commit hook to validate the format of that
makes sense in most cases.

### JavaScript (e.g. NodeJS, Vanilla)

The `project/js` is intended to be used in vanilla JS environments and
contains our base ESLint configuration that works with our Prettier
configuration. It does not use any framework specific rules and should
be applicable to any JavaScript project.

```
npx d2-style install project/js

# * project/js (includes: tools/all, github/all, linter/eslint,
#   formatter/prettier, git/husky-frontend)
```

### React

The `project/react` should be a good starting point for a React project,
as it adds `eslint-plugin-react`.

```
npx d2-style install project/react

# * project/react (includes: base/all, github/all, linter/eslint-react,
#   formatter/prettier, git/husky-frontend)
```
