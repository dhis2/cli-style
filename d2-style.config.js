module.exports = {
    hooks: {
        'commit-msg': ['./bin/d2-style check commit "$1"'],
        'pre-commit': ['./bin/d2-style check'],
        'pre-push': ['yarn test'],
    },
}
