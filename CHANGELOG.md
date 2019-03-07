# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.2.2"></a>
## [2.2.2](https://github.com/dhis2/cli-style/compare/2.2.1...2.2.2) (2019-03-07)


### Bug Fixes

* clean up js filter mechanism ([#21](https://github.com/dhis2/cli-style/issues/21)) ([ece8c53](https://github.com/dhis2/cli-style/commit/ece8c53))
* do not put a scary error message when checking files ([#27](https://github.com/dhis2/cli-style/issues/27)) ([4cecb27](https://github.com/dhis2/cli-style/commit/4cecb27))
* make the messages more meaningful ([#25](https://github.com/dhis2/cli-style/issues/25)) ([d2ae8af](https://github.com/dhis2/cli-style/commit/d2ae8af))



<a name="2.2.1"></a>
## [2.2.1](https://github.com/dhis2/cli-style/compare/2.2.0...2.2.1) (2019-03-05)


### Bug Fixes

* change to debug msg ([5be1ad2](https://github.com/dhis2/cli-style/commit/5be1ad2))
* reset prettier and browserslists ([d1eab91](https://github.com/dhis2/cli-style/commit/d1eab91))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/dhis2/cli-style/compare/2.1.0...2.2.0) (2019-03-05)


### Bug Fixes

* only the apply command was properly whitelisted ([#19](https://github.com/dhis2/cli-style/issues/19)) ([8a7556a](https://github.com/dhis2/cli-style/commit/8a7556a))


### Features

* set an exit code if js check fails ([#18](https://github.com/dhis2/cli-style/issues/18)) ([3833bea](https://github.com/dhis2/cli-style/commit/3833bea))



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
