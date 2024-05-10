module.exports = {
    customSyntax: 'postcss-styled-jsx',
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
