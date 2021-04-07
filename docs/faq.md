# Why use the rule X? I prefer Y.

Some wisdom from Go:

> `gofmt`'s style is no one's favorite, yet `gofmt` is everyone's favorite.

# I'm getting husky errors

This library as of version 8.0.0 no longer depends on husky, so if you
are getting errors like:

```
Can't find Husky, skipping pre-commit hook
You can reinstall it using 'npm install husky --save-dev' or delete this hook
```

You can remove the husky hooks from `.git/hooks` and opt in to use the
hooks provided here with e.g. `d2-style install git-hooks/all`.

Ensure that your node and git versions satisfy the above requirements.
You can check this by running `git --version` and `node --version` from
your terminal.

# What does an Error and Warnings mean?

`d2-style` is strict by default, as it tries to guard against known lint
from entering the codebase. If the lint is denied early, it is easier,
and faster, to fix it.

We set most our style rules as error to serve this purpose. This works
best when `d2-style` is added to a project that doesn't have a lot of
code yet.

It is also not fun when `d2-style` decides to adopt new rules as errors.
That means by simply updating `d2-style` the codebase can be in need of
significant clean-ups. This is problematic because it can slow adoption
of new versions of the code style, and it can hold back adoption of new
and better code style rules.

To allow for gradual adoption of rules, warnings can be used before
upgrading them to errors.
