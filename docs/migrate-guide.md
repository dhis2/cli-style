# From previous d2-style version to 5.x

Going from a previous version of d2-style, it is best to first uninstall
it, only to install it fresh after.

1.  Remove `@dhis2/cli-style`:

    ```bash
    yarn remove @dhis2/cli-style
    ```

1.  Clear out the local Git hooks (if the uninstall did not do it
    automatically):

    ```bash
    rm .git/hooks/*
    ```

1.  Take this opportunity to clear out (or back up) any Husky
    configuration you have around, e.g. in `package.json` or in
    `.huskyrc{,.js}`.

1.  If you have modified any of the d2-style controlled configuration
    files, back them up now.

1.  Now, let us get down to business. Install `@dhis2/cli-style`:

    ```bash
    yarn add @dhis2/cli-style --dev
    ```

1.  At this point the newest version of `d2-style` will be installed,
    and Husky will have written updated hooks to `.git/hooks`.

1.  Depending on the project, you will want to vary the next command,
    but in all cases you will want to regenerate new configuration files:

    ```bash
    # no assumption about the project
    yarn d2-style install project/base --force

    # assuming a javascript project
    yarn d2-style install project/js --force

    # assuming a react project
    yarn d2-style install project/react --force
    ```

    (You did take a backup of modified configuration files earlier, right?)

1.  _(Optional)_ Copy back any of your old customizations that you still
    need from the backups, then remove the backups.

# From existing Husky/ESLint/Prettier..

Let's deal with these one by one before installing `d2-style`.

## 1. Cleaning up

### Husky

Uninstall Husky by running:

```bash
yarn remove husky
```

Husky should clean up after itself, but if it has left hooks in
`.git/hooks` for some reason, wipe them manually:

```bash
rm .git/hooks/*
```

Now remove any Husky configuration from `package.json` and/or
`.huskyrc{,.js}` files.

### ESLint

If you have any ESLint configuration files laying around, move them to a
backup file for now. You might want to add some rules back in after
generating DHIS2 configurations.

### Prettier

The Prettier configuration you should remove. There is no reason to keep
a custom Prettier configuration file around. The only reason `d2-style`
generates one is to allow your IDE to pick up the configuration from the
default location.

## 2. Setting up d2-style

At this point you should be at a pristine starting position and be able
to follow the fresh install instructions in the [getting
started](getting-started) guide.
