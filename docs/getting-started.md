# After cloning a repository

The first time you check out a repo, you need to enable the Git hooks
manually. Husky used to do this by default, but both NPM and Yarn are
moving away from `postinstall` scripts.

This introduces a manual step. So a standard clone and install
operations looks like:

```bash
git clone /path/to/repo && cd repo

yarn install

yarn d2-style install # this enables the hooks in .hooks
```

# Fresh install

First up you will need to add `d2-style` as a development dependency. We
recommend using Yarn as it is what we use by default, but NPM will work
just fine.

```bash
yarn add @dhis2/cli-style --dev
```

# Setup scripts

It is recommended to use Git hooks to `check` for style inconsistencies,
and then `apply`ing the styles and staging the changes manually. It is
possible to automatically stage after formatting, but it is no longer
provided as out-of-the-box functionality.

Some example scripts follow:

```json
"scripts": {
    "lint": "yarn d2-style check",
    "lint:staged": "yarn lint --staged",

    "format": "yarn d2-style apply"
    "format:staged": "yarn format --staged",
},
```

# Install DHIS2 configuration files

`d2-style` can automatically generate the configuration files into the
repository for you. For a list of valid groups and what tools they will
configure, use:

```bash
yarn d2-style add --help
```

If a config file already exists, it may have local modifications, so the
new config file is created with a `.new` suffix so that they can be
manually merged.

To regenerate and overwrite, pass the `--overwrite` flag.

## Configuration templates for tools

`d2-style` comes with templates for projects of different types that can
be added to the project using the `add` command.

The structure is: `d2-style add {tool} {template}`

```sh
# to add the default eslint configuration
yarn d2-style add eslint

# to add the react eslint configuration
yarn d2-style add eslint react
```

To add Git hooks, the format is:

```sh
yarn d2-style add git-hook {hook} {command}
```

Examples:

```sh
yarn d2-style add git-hook pre-commit "yarn d2-style apply && git add -u"
yarn d2-style add git-hook pre-push "yarn test"
```
