const ERROR = 2

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
        'sort-imports': [
            ERROR,
            {
                ignoreCase: false,
                ignoreDeclarationSort: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            },
        ],
        'no-mixed-spaces-and-tabs': [ERROR],
    },
}
