# Why use the rule X? I prefer Y.

Some wisdom from Go:

> Gofmt's style is no one's favorite, yet gofmt is everyone's favorite.

# I'm getting husky errors

This library as of version 8.0.0 no longer depends on husky, so if you
are getting errors like:

```
Can't find Husky, skipping pre-commit hook
You can reinstall it using 'npm install husky --save-dev' or delete this hook
```

You can remove the husky hooks from `.git/hooks` and opt in to use the
hooks provided here with e.g. `d2-style install git-hooks/all`.
