const { config } = require('@dhis2/cli-style')

module.exports = {
    parser: 'babel-eslint',

    extends: ['plugin:react/recommended', config.eslint],

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
