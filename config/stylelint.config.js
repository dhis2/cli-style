module.exports = {
    overrides: [
        { files: '**/*.{js,jsx,ts,tsx}', customSyntax: 'postcss-styled-jsx' },
    ],
    plugins: ['stylelint-use-logical'],
    rules: {
        /**
         * Warn user when properties can't be autofixed:
         * https://github.com/csstools/stylelint-use-logical/issues/29
         */
        'declaration-property-value-disallowed-list': [
            {
                'border-color': [],
                'border-style': [],
                'border-width': [],
                inset: [],
                margin: [],
                padding: [],
                'scroll-margin': [],
                'scroll-padding': [],
            },
            {
                message: (prop) =>
                    `Use longhand form of ${prop} so that it can be autofixed to logical properties and values`,
                severity: 'warning',
            },
        ],
        'csstools/use-logical': [
            true,
            {
                severity: 'warning',
            },
        ],
    },
}
