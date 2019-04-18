module.exports = {
    root: true,

    parserOptions: {
        // latest standard is ok, eq. to 9
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
        },
    },

    rules: {
        'max-params': [
            2,
            {
                max: 3,
            },
        ],
    },
}
