# Ignore files

Tools have different ways to ignore files, Git uses `.gitignore`, and
[ESLint](https://eslint.org/docs/user-guide/configuring#eslintignore) and
[Prettier](https://prettier.io/docs/en/ignore.html#ignoring-files) have their
own counterparts.

Thankfully, ESLint and Prettier have adopted the [`.gitignore`
format](https://git-scm.com/docs/gitignore#_pattern_format), so across these
tools, the ignore files are compatible.

When using `d2-style` you may want to:

-   Have different ignores for Prettier and ESLint
-   Have different ignores for `d2-style` and Git
-   Share ignores across all supported tools

## Look-up behavior

All file look ups are done in relation to the current working directory.

If the `.d2styleignore` file exists, and there is no specific
configuration for a tool, then `.d2styleignore` will be passed to both
ESLint and Prettier.

If you do not have any custom ignore files, then your `.gitignore` will
be used if it exists.

## Ignore file priority

It is possible to override the ignore list for specific tools by adding
a corresponding ignore file.

The following files are supported, in prioritised order:

-   `.eslintignore` _(ESLint only)_
-   `.prettierignore` _(Prettier only)_
-   `.d2styleignore` _(All excluding Git)_
-   `.gitignore` _(All including Git)_
