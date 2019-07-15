module.exports = {
    hooks: {
        'commit-msg': './bin/d2-style commit check',
        'pre-commit':
            'yarn test && ./bin/d2-style validate --lint-staged-config .lint-stagedrc.js',
    },
}
