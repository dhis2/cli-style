const log = require('@dhis2/cli-helpers-engine').reporter

const fg = require('fast-glob')

const { prettier, eslint } = require('../../tools/js/index.js')

exports.command = 'check [files..]'

exports.describe = 'Check JS format.'

exports.builder = {
    prettierConfig: {
        describe: 'Prettier config file to use',
        type: 'string',
    },
    eslintConfig: {
        describe: 'ESLint config file to use',
        type: 'string',
    },
    pattern: {
        describe:
            'Pattern to match for files, remember to enclose in double quotes!',
        type: 'string',
        default: '**/*.{js,jsx,ts,tsx}',
    },
}

exports.handler = argv => {
    const { files, pattern, eslintConfig, prettierConfig } = argv

    const prettierOpts = {
        config: prettierConfig,
    }

    const eslintOpts = {
        config: eslintConfig,
    }

    if (files) {
        prettierOpts.files = files
        eslintOpts.files = files
    } else {
        const entries = fg.sync([pattern], {
            dot: false,
            ignore: ['node_modules'],
        })

        prettierOpts.files = entries
        eslintOpts.files = entries
    }

    log.info('Running ESLint...')
    eslint(eslintOpts)

    log.info('Running Prettier...')
    prettier(prettierOpts)
}
