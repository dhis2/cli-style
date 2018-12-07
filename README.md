# code-style
[![Packages Compatible](https://img.shields.io/badge/dhis2-packages-ff69b4.svg)](https://github.com/dhis2/packages)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

DHIS2 JavaScript code style

Applies our configuration for:

-   Git commit messages
-   Prettier
-   Browserslist

## Usage

### Yarn

```
yarn add -D @dhis2/code-style
```

### NPM

```
npm install --save-dev @dhis2/code-style
```

### Add `script`

Add this to `package.json` in the script part:

```
{
    scripts: {
        "format": "code-style"
    }
}
```

### Add pre-commit hook for `commit-style`

Install [Husky](https://github.com/typicode/husky) or other hook handler:

```
npm install husky --save-dev
```

Add prop to `package.json`:

```
"husky": {
    "hooks": {
        "commit-msg": "commit-style",
        "pre-commit": "code-style"
    }
}
```

Run the `format` script to apply our common JS standards.

## Migrating from custom configs

Existing configuration in e.g. `.prettierrc`, et. al. can
be removed as they will be overridden by the configuration bundled with
`code-style` anyway.

Any dependencies to Prettier can also be removed.

Works with CRA (with or without ejecting).
