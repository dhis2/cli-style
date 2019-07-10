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

## How it works

1. When `cli-style` is installed, Husky installs itself as a Git hook,
   since it is a runtime dependency of `cli-style`.

2. `d2-style setup` installs the necessary configuration files in the
   repo. 

3. Now, when a hook is triggered (e.g. `pre-commit`), the `.huskyrc.js`
   configuration is read for that specific hook, and the command is
   executed.

4. In the case of `pre-commit`, the command is `d2-style validate`,
   which sets up `lint-staged` configuration.

5. `lint-staged` is executed and passes all the _staged_ files matching a
   _glob_ in the lint-staged configuration to the designated command,
   e.g. `d2-style js apply --stage` which will delint JS files and
   automatically apply the fixes, and stage the result.

6. If all goes well, `d2-style js apply --stage` exits with a exit code
   of `0`, which will let lint-staged to continue with matching more
   _globs_ and running additional linters. Well everything is good,
   `lint-staged` exits with code `0`.

7. With the default Husky config, the commit message itself will be
   checked using `d2-style commit check` which uses `commitlint`
   internally. If the commit message is valid, it exits with `0`.

8. The commit is created. If at any point a tool exits with a non-zero
   exit code, then the process halts.

## Overrides

There are opportunities to extend and change the behaviour of      
`cli-style`, and because of how the different tools themselves work, the
process varies slightly. Remember how the command chain work, and it is
easier to reason about why.

### Husky

### Lint Staged

### ESLint

### Prettier

