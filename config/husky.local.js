module.exports = {
    hooks: {
        'commit-msg': 'd2-style commit check',
        'pre-commit':
            'd2-style validate --lint-staged-config .lint-stagedrc.js --prettier-config .prettierrc.js',
    },
}
