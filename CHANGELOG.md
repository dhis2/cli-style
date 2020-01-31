## [5.1.1](https://github.com/dhis2/cli-style/compare/v5.1.0...v5.1.1) (2020-01-31)


### Bug Fixes

* **eslint:** suppress warning logs ([a81dd68](https://github.com/dhis2/cli-style/commit/a81dd688ae10f0fb65c22d8c70528432bcdea430))

# [5.1.0](https://github.com/dhis2/cli-style/compare/v5.0.4...v5.1.0) (2019-12-16)


### Features

* **ignorefiles:** add consistency to the ignorefiles that are respected ([fdba06e](https://github.com/dhis2/cli-style/commit/fdba06ed1bf34a36ba30549787d70fa4dd26e054))

## [5.0.4](https://github.com/dhis2/cli-style/compare/v5.0.3...v5.0.4) (2019-12-16)


### Bug Fixes

* **eslint:** do not add an unignore pattern to the cli command ([7f0e5da](https://github.com/dhis2/cli-style/commit/7f0e5da85b3a53562439348719e9af69f926ddf3))

## [5.0.3](https://github.com/dhis2/cli-style/compare/v5.0.2...v5.0.3) (2019-12-02)


### Bug Fixes

* **husky:** load husky config before spreading ([f593085](https://github.com/dhis2/cli-style/commit/f5930859eaaf2f1b9501916f31cad3c3a57ebabe))

## [5.0.2](https://github.com/dhis2/cli-style/compare/v5.0.1...v5.0.2) (2019-11-25)


### Bug Fixes

* add es6 env to eslint config ([c1d9092](https://github.com/dhis2/cli-style/commit/c1d909212d7443d7e620432a38f80fb09246258d))

## [5.0.1](https://github.com/dhis2/cli-style/compare/v5.0.0...v5.0.1) (2019-11-22)


### Bug Fixes

* update README (and trigger release) ([b220402](https://github.com/dhis2/cli-style/commit/b220402d07360b7040d5b1999c787b62bafa96fc))

# [5.0.0](https://github.com/dhis2/cli-style/compare/v4.2.1...v5.0.0) (2019-11-22)


### Bug Fixes

* add CHANGELOG.md to blacklist ([4a59f25](https://github.com/dhis2/cli-style/commit/4a59f257914395d693e117a116a062d936d1f313))
* improve logging for common situations ([0b435db](https://github.com/dhis2/cli-style/commit/0b435dbbbe4903620e4d63c5bfc91aa2a3cd42dc))
* order of type and count ([bdf10a4](https://github.com/dhis2/cli-style/commit/bdf10a455a180981b22d336284838fad847f79ac))


### Code Refactoring

* rework internals and external api ([4d1a4eb](https://github.com/dhis2/cli-style/commit/4d1a4eb0b26b5047d64cc4340ff19120b22ef816))


### Features

* allow eslint-react config to be bundled ([ab63b9b](https://github.com/dhis2/cli-style/commit/ab63b9bd1b694fcdfd7a982365a4ed7b6917188c))


### BREAKING CHANGES

* Removes LintStaged, renames `setup` to `install`,
removes `validate` command. Uses a different way to match files and
filters out results instead.

## [4.2.1](https://github.com/dhis2/cli-style/compare/v4.2.0...v4.2.1) (2019-11-22)

### Bug Fixes

-   ignore .d2 directory ([c4c384b](https://github.com/dhis2/cli-style/commit/c4c384bbffd24410445cec9dc852b4858967d7d4))

# [4.2.0](https://github.com/dhis2/cli-style/compare/v4.1.3...v4.2.0) (2019-10-10)

### Features

-   **semantic:** enforce validation on commits and pr title ([7f8e21d](https://github.com/dhis2/cli-style/commit/7f8e21d762b7baf4b168debd8a2dbec61f19df92))

## [4.1.3](https://github.com/dhis2/cli-style/compare/v4.1.2...v4.1.3) (2019-10-04)

### Bug Fixes

-   **eslint:** print a warning when eslint falls back to the built-in ([#143](https://github.com/dhis2/cli-style/issues/143)) ([7afa944](https://github.com/dhis2/cli-style/commit/7afa944))

## [4.1.2](https://github.com/dhis2/cli-style/compare/v4.1.1...v4.1.2) (2019-09-30)

### Bug Fixes

-   **dependabot:** remove java/docker/submodules from default config ([#133](https://github.com/dhis2/cli-style/issues/133)) ([b6d93cf](https://github.com/dhis2/cli-style/commit/b6d93cf))

## [4.1.1](https://github.com/dhis2/cli-style/compare/v4.1.0...v4.1.1) (2019-07-17)

### Bug Fixes

-   allow ignore files to be read ([#100](https://github.com/dhis2/cli-style/issues/100)) ([a89faab](https://github.com/dhis2/cli-style/commit/a89faab))

# [4.1.0](https://github.com/dhis2/cli-style/compare/v4.0.0...v4.1.0) (2019-07-15)

### Features

-   export configs from package ([#93](https://github.com/dhis2/cli-style/issues/93)) ([55fd0f9](https://github.com/dhis2/cli-style/commit/55fd0f9))

# [4.0.0](https://github.com/dhis2/cli-style/compare/v3.3.4...v4.0.0) (2019-07-14)

### Features

-   introduce custom configurations and lint-staged for stashing unstaged changes ([#72](https://github.com/dhis2/cli-style/issues/72)) ([9f467ab](https://github.com/dhis2/cli-style/commit/9f467ab))

### BREAKING CHANGES

-   Changes multiple defaults for `d2-style`, removes the `install` command, adds extendable configs, only executes style checks on staged files by default, and more.

*   `d2-style js apply` no longer stages files by default, use `--stage` to stage fixed files. The intended usage for this function is primarily to apply the js code standards to files in general, e.g. unstaged/staged files or an entire repo.

*   `d2-style validate` has changed to by default run `--fix`, and uses lint-staged to only apply code standards to staged files and/or hunks.

*   `d2-style validate --all` no longer exists, validate only operates on staged files and is intended to be used as a pre-commit check. Use `d2-style js check` or apply with `--all` instead.

*   `d2-style validate` output has changed. It no longer gives detailed information during a run. It only prints errors when it fails.

*   `d2-style js install` has been removed, and the clean-up functions have also been removed.

*   `d2-style setup` no longer installs `all` by default, instead prints available groups when command is run.

*   It is now possible to stage hunks (`git add -p`) and only style check those hunks.

*   It is now possible to extend configuration for lint-staged, eslint, etc.

*   Husky hooks included out of the box with `d2-style setup git/husky`

## [3.3.4](https://github.com/dhis2/cli-style/compare/v3.3.3...v3.3.4) (2019-06-14)

### Bug Fixes

-   setup semantic configuration for prs ([#73](https://github.com/dhis2/cli-style/issues/73)) ([ef0738a](https://github.com/dhis2/cli-style/commit/ef0738a))

## [3.3.3](https://github.com/dhis2/cli-style/compare/v3.3.2...v3.3.3) (2019-06-13)

### Bug Fixes

-   log the message before copying ([#71](https://github.com/dhis2/cli-style/issues/71)) ([531e115](https://github.com/dhis2/cli-style/commit/531e115))

## [3.3.2](https://github.com/dhis2/cli-style/compare/v3.3.1...v3.3.2) (2019-06-12)

### Bug Fixes

-   destructure import for format ([#70](https://github.com/dhis2/cli-style/issues/70)) ([13fc1d9](https://github.com/dhis2/cli-style/commit/13fc1d9))

## [3.3.1](https://github.com/dhis2/cli-style/compare/v3.3.0...v3.3.1) (2019-06-07)

### Bug Fixes

-   update broken dependabot config ([#55](https://github.com/dhis2/cli-style/issues/55)) ([c6bca3f](https://github.com/dhis2/cli-style/commit/c6bca3f))

# [3.3.0](https://github.com/dhis2/cli-style/compare/v3.2.2...v3.3.0) (2019-06-07)

### Features

-   add validations for dhis2 package.json files ([#47](https://github.com/dhis2/cli-style/issues/47)) ([40febb5](https://github.com/dhis2/cli-style/commit/40febb5))

## [3.2.2](https://github.com/dhis2/cli-style/compare/v3.2.1...v3.2.2) (2019-05-14)

### Bug Fixes

-   ignore deleted files when formatting ([#46](https://github.com/dhis2/cli-style/issues/46)) ([4ebee0e](https://github.com/dhis2/cli-style/commit/4ebee0e))

## [3.2.1](https://github.com/dhis2/cli-style/compare/v3.2.0...v3.2.1) (2019-05-14)

### Bug Fixes

-   update @dhis2/cli-helpers-engine to the latest version 🚀 ([#45](https://github.com/dhis2/cli-style/issues/45)) ([dec2e34](https://github.com/dhis2/cli-style/commit/dec2e34))

# [3.2.0](https://github.com/dhis2/cli-style/compare/v3.1.3...v3.2.0) (2019-05-14)

### Features

-   install .eslintrc ([#44](https://github.com/dhis2/cli-style/issues/44)) ([1c0f905](https://github.com/dhis2/cli-style/commit/1c0f905))

## [3.1.3](https://github.com/dhis2/cli-style/compare/v3.1.2...v3.1.3) (2019-05-09)

### Bug Fixes

-   unpin deps as problem is fixed upstream ([#38](https://github.com/dhis2/cli-style/issues/38)) ([aeff5b1](https://github.com/dhis2/cli-style/commit/aeff5b1))

## [3.1.2](https://github.com/dhis2/cli-style/compare/v3.1.1...v3.1.2) (2019-05-09)

### Bug Fixes

-   pin commitlint versions ([#37](https://github.com/dhis2/cli-style/issues/37)) ([37de6ab](https://github.com/dhis2/cli-style/commit/37de6ab))

## [3.1.1](https://github.com/dhis2/cli-style/compare/v3.1.0...v3.1.1) (2019-04-24)

### Bug Fixes

-   use eslint linter instead of the cli engine ([#34](https://github.com/dhis2/cli-style/issues/34)) ([e9e9331](https://github.com/dhis2/cli-style/commit/e9e9331))

# [3.1.0](https://github.com/dhis2/cli-style/compare/v3.0.1...v3.1.0) (2019-04-24)

### Features

-   add support for eslint for code style enforcement ([#33](https://github.com/dhis2/cli-style/issues/33)) ([85cf53a](https://github.com/dhis2/cli-style/commit/85cf53a))

## [3.0.1](https://github.com/dhis2/cli-style/compare/v3.0.0...v3.0.1) (2019-03-28)

### Bug Fixes

-   link to build in readme and actually trigger a build ([16fcfca](https://github.com/dhis2/cli-style/commit/16fcfca))

# [3.0.0](https://github.com/dhis2/cli-style/compare/v2.0.0...v3.0.0) (2019-03-25)

### Bug Fixes

-   bump to 3.x ([6a99cb8](https://github.com/dhis2/cli-style/commit/6a99cb8))

### BREAKING CHANGES

-   Need to get away from the old versions on npm.

# [2.0.0](https://github.com/dhis2/cli-style/compare/v1.7.0...v2.0.0) (2019-03-25)

### Bug Fixes

-   add 'target' to blacklisted folders ([#9](https://github.com/dhis2/cli-style/issues/9)) ([d6170b9](https://github.com/dhis2/cli-style/commit/d6170b9))
-   add apply/check command to js ([3da7d5c](https://github.com/dhis2/cli-style/commit/3da7d5c))
-   change to debug msg ([5be1ad2](https://github.com/dhis2/cli-style/commit/5be1ad2))
-   clean up js filter mechanism ([#21](https://github.com/dhis2/cli-style/issues/21)) ([ece8c53](https://github.com/dhis2/cli-style/commit/ece8c53))
-   do not put a scary error message when checking files ([#27](https://github.com/dhis2/cli-style/issues/27)) ([4cecb27](https://github.com/dhis2/cli-style/commit/4cecb27))
-   make the messages more meaningful ([#25](https://github.com/dhis2/cli-style/issues/25)) ([d2ae8af](https://github.com/dhis2/cli-style/commit/d2ae8af))
-   only the apply command was properly whitelisted ([#19](https://github.com/dhis2/cli-style/issues/19)) ([8a7556a](https://github.com/dhis2/cli-style/commit/8a7556a))
-   only whitelist js under js subcommand ([9dc010a](https://github.com/dhis2/cli-style/commit/9dc010a))
-   reset prettier and browserslists ([d1eab91](https://github.com/dhis2/cli-style/commit/d1eab91))
-   resolve cli-style path by using dirname ([3a61532](https://github.com/dhis2/cli-style/commit/3a61532))
-   update help text ([f820a66](https://github.com/dhis2/cli-style/commit/f820a66))
-   update pre-hook ([6988cf9](https://github.com/dhis2/cli-style/commit/6988cf9))
-   use reporter from helpers-engine ([ef79104](https://github.com/dhis2/cli-style/commit/ef79104))
-   use the new release script ([#31](https://github.com/dhis2/cli-style/issues/31)) ([2e2e454](https://github.com/dhis2/cli-style/commit/2e2e454))
-   use two-param version for pkg to identify assets ([284ce0b](https://github.com/dhis2/cli-style/commit/284ce0b))

### Features

-   add ability to pass in files to check and apply ([2e7fcdd](https://github.com/dhis2/cli-style/commit/2e7fcdd))
-   add editorconfig ([#13](https://github.com/dhis2/cli-style/issues/13)) ([8b0c392](https://github.com/dhis2/cli-style/commit/8b0c392))
-   add option to not stage formatted files ([00d5bc7](https://github.com/dhis2/cli-style/commit/00d5bc7))
-   allow check/apply commands for commit msgs ([aca257f](https://github.com/dhis2/cli-style/commit/aca257f))
-   convert to @dhis2/cli format ([d95179c](https://github.com/dhis2/cli-style/commit/d95179c))
-   set an exit code if js check fails ([#18](https://github.com/dhis2/cli-style/issues/18)) ([3833bea](https://github.com/dhis2/cli-style/commit/3833bea))
-   stop auto-install of prettier and other config files ([#29](https://github.com/dhis2/cli-style/issues/29)) ([8c030b1](https://github.com/dhis2/cli-style/commit/8c030b1))

### BREAKING CHANGES

-   removes the binaries for `code-style.js` and
    `commit-style.js` and instead exposes a binary named `d2-style` which is
    the subcommand which the `d2` cli will use.

# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.2.2"></a>

## [2.2.2](https://github.com/dhis2/cli-style/compare/2.2.1...2.2.2) (2019-03-07)

### Bug Fixes

-   clean up js filter mechanism ([#21](https://github.com/dhis2/cli-style/issues/21)) ([ece8c53](https://github.com/dhis2/cli-style/commit/ece8c53))
-   do not put a scary error message when checking files ([#27](https://github.com/dhis2/cli-style/issues/27)) ([4cecb27](https://github.com/dhis2/cli-style/commit/4cecb27))
-   make the messages more meaningful ([#25](https://github.com/dhis2/cli-style/issues/25)) ([d2ae8af](https://github.com/dhis2/cli-style/commit/d2ae8af))

<a name="2.2.1"></a>

## [2.2.1](https://github.com/dhis2/cli-style/compare/2.2.0...2.2.1) (2019-03-05)

### Bug Fixes

-   change to debug msg ([5be1ad2](https://github.com/dhis2/cli-style/commit/5be1ad2))
-   reset prettier and browserslists ([d1eab91](https://github.com/dhis2/cli-style/commit/d1eab91))

<a name="2.2.0"></a>

# [2.2.0](https://github.com/dhis2/cli-style/compare/2.1.0...2.2.0) (2019-03-05)

### Bug Fixes

-   only the apply command was properly whitelisted ([#19](https://github.com/dhis2/cli-style/issues/19)) ([8a7556a](https://github.com/dhis2/cli-style/commit/8a7556a))

### Features

-   set an exit code if js check fails ([#18](https://github.com/dhis2/cli-style/issues/18)) ([3833bea](https://github.com/dhis2/cli-style/commit/3833bea))

<a name="2.1.0"></a>

# [2.1.0](https://github.com/dhis2/cli-style/compare/2.0.1...2.1.0) (2019-03-04)

### Bug Fixes

-   only whitelist js under js subcommand ([9dc010a](https://github.com/dhis2/cli-style/commit/9dc010a))

### Features

-   add editorconfig ([#13](https://github.com/dhis2/cli-style/issues/13)) ([8b0c392](https://github.com/dhis2/cli-style/commit/8b0c392))

<a name="2.0.1"></a>

## [2.0.1](https://github.com/dhis2/cli-style/compare/2.0.0...2.0.1) (2019-02-08)

<a name="2.0.0"></a>

# [2.0.0](https://github.com/dhis2/code-style/compare/1.7.1...2.0.0) (2019-02-08)

### Bug Fixes

-   add apply/check command to js ([3da7d5c](https://github.com/dhis2/code-style/commit/3da7d5c))
-   resolve cli-style path by using dirname ([3a61532](https://github.com/dhis2/code-style/commit/3a61532))
-   update help text ([f820a66](https://github.com/dhis2/code-style/commit/f820a66))
-   update pre-hook ([6988cf9](https://github.com/dhis2/code-style/commit/6988cf9))
-   use reporter from helpers-engine ([ef79104](https://github.com/dhis2/code-style/commit/ef79104))
-   use two-param version for pkg to identify assets ([284ce0b](https://github.com/dhis2/code-style/commit/284ce0b))

### Features

-   add ability to pass in files to check and apply ([2e7fcdd](https://github.com/dhis2/code-style/commit/2e7fcdd))
-   add option to not stage formatted files ([00d5bc7](https://github.com/dhis2/code-style/commit/00d5bc7))
-   allow check/apply commands for commit msgs ([aca257f](https://github.com/dhis2/code-style/commit/aca257f))
-   convert to [@dhis2](https://github.com/dhis2)/cli format ([d95179c](https://github.com/dhis2/code-style/commit/d95179c))

### BREAKING CHANGES

-   removes the binaries for `code-style.js` and
    `commit-style.js` and instead exposes a binary named `d2-style` which is
    the subcommand which the `d2` cli will use.

<a name="1.7.1"></a>

## [1.7.1](https://github.com/dhis2/code-style/compare/1.7.0...1.7.1) (2018-12-12)

### Bug Fixes

-   add 'target' to blacklisted folders ([#9](https://github.com/dhis2/code-style/issues/9)) ([d6170b9](https://github.com/dhis2/code-style/commit/d6170b9))

# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
