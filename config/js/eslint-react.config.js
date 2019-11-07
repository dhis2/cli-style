module.exports = {
    parser: 'babel-eslint',

    extends: ['./eslint.config.js', 'plugin:react/recommended'],

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
    },
}
