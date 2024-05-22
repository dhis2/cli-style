module.exports = {
    overrides: [
        { files: '**/*.{js,jsx,ts,tsx}', customSyntax: 'postcss-styled-jsx' },
    ],
    plugins: ['stylelint-use-logical'],
    rules: {
        'csstools/use-logical': [
            true,
            {
                severity: 'warning',
            },
        ],
    },
}
