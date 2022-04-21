module.exports = {
    hooks: {
        'commit-msg': ['yarn d2-style check commit "$1"'],
        'pre-commit': ['yarn d2-style check --staged'],
    },
    tools: {
        eslint: ['react'],
        prettier: [],
        github: ['dependabot', 'stale'],
        editorconfig: [],
        commitlint: [],
    },
    patterns: {
        js: '*.{js,jsx,ts,tsx}',
        text: '*.{md,json,yml,html}',
    },
}
