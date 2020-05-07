# Why use the rule X? I prefer Y.

Some wisdom from Go:

> Gofmt's style is no one's favorite, yet gofmt is everyone's favorite.

# I'm getting husky errors

This library depends on husky, which requires node >= 10 and git >= 2.13.0. If you're getting errors like this:

```
Can't find Husky, skipping pre-commit hook
You can reinstall it using 'npm install husky --save-dev' or delete this hook
```

Ensure that your node and git versions satisfy the above requirements. You can check this by running `git --version` and `node --version` from your terminal.
