# Getting started

## After cloning a repository

The first time you check out a repo, you need to enable the Git hooks
manually. Husky used to do this by default, but both NPM and pnpm are
moving away from `postinstall` scripts.

This introduces a manual step. So a standard clone and install
operations looks like:

```bash
git clone /path/to/repo && cd repo

pnpm install

pnpm d2-style install # this enables the hooks in .hooks
```

## Fresh install

First up you will need to add `d2-style` as a development dependency. We
recommend using `pnpm` as it is what we use by default, but NPM will work
just fine.

```bash
pnpm add @dhis2/cli-style --dev
```

## Setup scripts

It is recommended to use Git hooks to `check` for style inconsistencies,
and then `apply`ing the styles and staging the changes manually. It is
possible to automatically stage after formatting, but it is no longer
provided as out-of-the-box functionality.

Some example scripts follow:

```json
"scripts": {
    "lint": "pnpm d2-style check",
    "lint:staged": "pnpm lint --staged",

    "format": "pnpm d2-style apply"
    "format:staged": "pnpm format --staged",
},
```

## Install DHIS2 configuration files

`d2-style` can automatically generate the configuration files into the
repository for you. For a list of valid groups and what tools they will
configure, use:

```bash
pnpm d2-style add --help
```

If a config file already exists, it may have local modifications, so the
new config file is created with a `.new` suffix so that they can be
manually merged.

To regenerate and overwrite, pass the `--overwrite` flag.

### Configuration templates for tools

`d2-style` comes with templates for projects of different types that can
be added to the project using the `add` command.

The structure is: `d2-style add {tool} {template}`

To add the default react eslint configuration:

```sh
pnpm d2-style add eslint react
```

To add prettier configuration:

```sh
pnpm d2-style add prettier
```

To add stylelint configuration:

```sh
pnpm d2-style add stylelint
```

To add Git hooks, the format is:

```sh
pnpm d2-style add git-hook {hook} {command}
```

Examples:

```sh
pnpm d2-style add git-hook pre-commit "pnpm d2-style apply && git add -u"
pnpm d2-style add git-hook pre-push "pnpm test"
```
