module.exports = {
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
