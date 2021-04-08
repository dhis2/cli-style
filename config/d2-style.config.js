module.exports = {
    hooks: {
        'commit-msg': ['yarn d2-style commit check "$1"'],
        'pre-commit': ['yarn d2-style check'],
        'pre-push': ['yarn test'],
    },
    tools: {
        eslint: ['react'],
        prettier: [],
        github: ['dependabot', 'semantic-pr', 'stale'],
        editorconfig: [],
        commitlint: [],
    },
    patterns: {
        js: '**/*.{js,jsx,ts,tsx}',
        text: '**/*.{md,json,yml,html}',
    },
}