module.exports = {
    extends: ['@commitlint/config-conventional'],
    /*
     * Ignore commits that don't contribute to a release. Release
     * commits often exceed the max. amount of characters because
     * of the appended changelog. This ignores those commits.
     */
    ignores: [(commit) => commit.includes('[skip release]')],
}
