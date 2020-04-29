module.exports = {
    parser: 'babel-eslint',

    extends: [
        './eslint.config.js',
        'plugin:react/recommended',
        'plugin:import/react',
    ],

    settings: {
        react: {
            version: 'detect',
        },
    },

    rules: {
        'react/sort-prop-types': [
            'error',
            {
                requiredFirst: true,
                sortShapeProp: true,
                callbacksLast: true,
            },
        ],
        'react/no-unused-prop-types': 'error',
        'import/no-unused-modules': [
            'error',
            {
                unusedExports: true,
                missingExports: true,
                ignoreExports: [
                    '**/*.test.js',
                    '**/__tests__/**',
                    '**/*.stories.*',
                    '**/setupTests.js',
                ],
            },
        ],
    },
}
