module.exports = {
    hooks: {
        'commit-msg': ['pnpm d2-style check commit "$1"'],
        'pre-commit': ['pnpm d2-style check --staged'],
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
        css: '*.css',
        text: '*.{md,json,yml,html}',
    },
}
