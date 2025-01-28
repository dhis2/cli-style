module.exports = {
    parser: '@typescript-eslint/parser',

    plugins: ['react-hooks'],

    extends: [
        './eslint.config.js',
        'plugin:react/recommended',
        'plugin:import/react',
    ],

    settings: {
        react: { version: 'detect' },
        // Prevents "error: unable to resolve module X" for .jsx files 
        // if .jsx extension isn't used, e.g.
        // `import Component from './component'`
        'import/resolver': { node: { extensions: ['.js', '.jsx'] } },
    },

    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
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
