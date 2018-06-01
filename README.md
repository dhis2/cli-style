# code-style

DHIS2 JavaScript code style

Applies our configuration for:

- ESLint
- Prettier

## Rationale

Adding Prettier and ESLint to each application we build and setting up
the configuration (through copypaste or otherwise) is error prone and
leads to a divergence in style.

The time has come to wrap code style configuration in a package we can
pull in and just run without fiddling with configuration in the app
itself.

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

## Migrating from custom configs

Existing configuration in e.g. `.prettierrc`, `.eslintrc`, et. al. can
be removed as they will be overridden by the configuration bundled with
`code-style` anyway.

Any dependencies to ESLint and Prettier can also be removed.
