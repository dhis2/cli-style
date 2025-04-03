module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
<<<<<<< HEAD
        'header-max-length': [2, 'always', 120],
=======
        'body-max-line-length': [1, 'always', 100],
>>>>>>> origin/master
    },
    /*
     * Ignore commits that don't contribute to a release. Release
     * commits often exceed the max. amount of characters because
     * of the appended changelog. This ignores those commits.
     */
    ignores: [(commit) => commit.includes('[skip release]')],
}
