# code-style

DHIS2 JavaScript code style

Applies our configuration for:

-   Commit messages
-   Prettier
-   ESLint

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
        "pre-commit": "npm run format"
    }
}
```

Run the `format` script to apply our common JS standards.

## Migrating from custom configs

Existing configuration in e.g. `.prettierrc`, `.eslintrc`, et. al. can
be removed as they will be overridden by the configuration bundled with
`code-style` anyway.

Any dependencies to ESLint and Prettier can also be removed.

Works with CRA (with or without ejecting).
