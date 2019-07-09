# cli-style

> This package is part of the [@dhis2/cli](https://github.com/dhis2/cli)
> commandline interface.


[![dhis2-cli Compatible](https://img.shields.io/badge/dhis2-cli-ff69b4.svg)](https://github.com/dhis2/cli)
[![@dhis2/cli-style on npm](https://img.shields.io/npm/v/@dhis2/cli-style.svg)](https://www.npmjs.com/package/@dhis2/cli-style)
[![travis.com build](https://img.shields.io/travis/com/dhis2/cli-style.svg)](https://travis-ci.com/dhis2/cli-style)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

This tool enforces DHIS2 configuration for:

#### Git

- Git commit messages

#### JavaScript

- Prettier
- ESLint
- Browserslist

This tool is part of the [dhis2/cli](https://github.com/dhis2/cli)
suite, but can also be used standalone which is useful for project level
integration.

As a terminal user check out the full CLI. :rocket:

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
repository for you, which gives you all of the relevant config files by
default.

```sh
npx d2-style setup
```

The `setup` command also accepts one or more configuration groups,
currently `all`, `js`, or `repo`. They can be combined as well:

```sh
npx d2-style setup js
npx d2-style setup repo js
npx d2-style setup all
npx d2-style setup
```

If a config file already exists, the tool skips overwriting it, in case
there are local modifications.

To regenerate and overwrite, pass the `--force` flag:

```sh
npx d2-style setup --force
```

From here, everything should be fine and ready to go.

