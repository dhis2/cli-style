const tasks = arr => arr.join(' && ')

module.exports = {
    hooks: {
        'commit-msg': './bin/d2-style commit check',
        'pre-commit': tasks([
            './bin/d2-style js check --staged',
            './bin/d2-style text check --staged',
        ]),
        'pre-push': 'yarn test',
    },
}
