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

In a project where you have JavaScript and Text sources that need to be
formatted, this would cover a complete workflow.

# Install DHIS2 configuration files

`d2-style` can automatically generate the configuration files into the
repository for you. For a list of valid groups and what tools they will
configure, use:

```bash
npx d2-style install --list-groups
```

If a config file already exists, the tool skips overwriting it, in case
there are local modifications.

To regenerate and overwrite, pass the `--force` flag.

## Pre-configured projects

`d2-style` comes with code style for a range of projects. These are some
common ones.

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
