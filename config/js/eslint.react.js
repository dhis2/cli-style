const { config } = require('@dhis2/cli-style')

module.exports = {
    parser: 'babel-eslint',

    extends: [config.eslint, 'plugin:react/recommended'],

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
    },
}
