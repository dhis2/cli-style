# code-style

DHIS2 JavaScript code style

Uses:

- ESLint
- Prettier

## Usage

### Yarn

```
yarn add -D @dhis2/code-style
```

### NPM

```
npm install --save-dev @dhis2/code-style
```

Add this to `package.json` in the script part:

```
{
    scripts: {
        "codestyle": "code-style"
    }
}
```

Run the `codestyle` script to apply our common JS standards.
