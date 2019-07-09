module.exports = {
    hooks: {
        'commit-msg': './bin/d2-style commit check',
        'pre-commit':
            './bin/d2-style validate --lint-staged-config .lint-stagedrc.js',
    },
}
