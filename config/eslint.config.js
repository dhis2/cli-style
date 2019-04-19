const ERROR = 2

module.exports = {
    root: true,

    env: {
        browser: true,
        node: true,
        jest: true,
    },

    parserOptions: {
        // latest standard is ok, eq. to 9
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
    },

    rules: {
        'max-params': [
            ERROR,
            {
                max: 3,
            },
        ],
        'prefer-const': [
            ERROR,
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: false,
            },
        ],
        'no-mixed-spaces-and-tabs': [ERROR],
    },
}
