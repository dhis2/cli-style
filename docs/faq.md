# Why use the rule X? I prefer Y.

Some wisdom from Go:

> `gofmt`'s style is no one's favorite, yet `gofmt` is everyone's favorite.

# I'm getting husky errors

This library depends on husky, which requires node >= 10 and git >= 2.13.0. If you're getting errors like this:

```
Can't find Husky, skipping pre-commit hook
You can reinstall it using 'npm install husky --save-dev' or delete this hook
```

Ensure that your node and git versions satisfy the above requirements. You can check this by running `git --version` and `node --version` from your terminal.

# What does an Error and Warnings mean?

`d2-style` is strict by default, as it tries to guard against known lint
from entering the codebase. If the lint is denied early, it is easier,
and faster, to fix it.

We set most our style rules to `error` to serve this purpose. This works
best when `d2-style` is added to a project that doesn't have a lot of
code yet.

It is not fun to add `d2-style` when the codebase has grown and
accumulated what is considered lint. Everything as errors means that it
will take real effort to de-lint the codebase.

It is also not fun when `d2-style` decides to adopt new rules as errors.
That means by simply updating `d2-style` the codebase can be in need of
significant clean-ups.

So `d2-style` operates with two levels: `--strict` and `--no-strict`.

In both modes, errors are considered problems significant enough that
they cannot be allowed into the code base.

In strict mode, warnings are NOT allowed into the code base.

In the non-strict mode, warnings are allowed into the code base and can
be used as an interim solution to allow for planned de-linting.
