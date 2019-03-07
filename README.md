# cli-style

[![dhis2-cli Compatible](https://img.shields.io/badge/dhis2-cli-ff69b4.svg)](https://github.com/dhis2/cli)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![Greenkeeper badge](https://badges.greenkeeper.io/dhis2/cli-style.svg)](https://greenkeeper.io/)

This tool applies our configuration for:

-   Git commit messages
-   Prettier (prettifies JavaScript)
-   Browserslist

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
d2-style --help
d2-style js --help
d2-style js check --help
d2-style js apply --help
```

## Setup for JavaScript project

### Add a format `script` to apply styles at will

Add this to `package.json` in the script part:

```
{
    scripts: {
        "format": "d2-style js apply"
    }
}
```

Run the `format` script to apply our common standards.

### Add pre-commit hook for commit message linter

Install [Husky](https://github.com/typicode/husky) or other hook handler:

```sh
npm install husky --save-dev

# or

yarn add husky --dev
```

Add prop to `package.json`:

```json
"husky": {
    "hooks": {
        "commit-msg": "d2-style commit check",
        "pre-commit": "d2-style js apply"
    }
}
```

## Migrating from custom configs

Existing configuration in e.g. `.prettierrc`, et. al. can
be removed as they will be overridden by the configuration bundled with
`cli-style` anyway.

Any dependencies to Prettier can also be removed.

Works with CRA (with or without ejecting).
