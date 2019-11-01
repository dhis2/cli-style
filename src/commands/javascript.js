const fg = require('fast-glob')

const { namespace } = require('@dhis2/cli-helpers-engine')
const log = require('@dhis2/cli-helpers-engine').reporter

const { eslint } = require('../tools/eslint.js')
const { prettier } = require('../tools/prettier.js')
const { blacklist, stagedFiles } = require('../utils/files.js')

const options = yargs =>
    yargs
        .option('prettierConfig', {
            describe: 'Prettier config file to use',
            type: 'string',
        })
        .option('eslintConfig', {
            describe: 'ESLint config file to use',
            type: 'string',
        })
        .option('pattern', {
            describe:
                'Pattern to match for files, remember to enclose in double quotes!',
            type: 'string',
            default: '**/*.{js,jsx,ts,tsx}',
        })
        .option('staged', {
            describe: 'Only check staged files in Git',
            type: 'boolean',
            default: 'false',
        })

const handler = (argv, apply) => {
    const { files, pattern, eslintConfig, prettierConfig, staged } = argv

    const opts = {
        apply,
    }

    if (files) {
        opts.files = files
    } else {
        const entries = fg.sync([pattern], {
            dot: false,
            ignore: blacklist,
            absolute: false,
        })

        opts.files = entries
    }

    if (staged) {
        opts.files = stagedFiles(opts.files)
        log.info('Linting staged files:', opts.files.join(', '))
    }

    log.info('Running ESLint...')
    eslint({
        config: eslintConfig,
        ...opts,
    })

    log.info('Running Prettier...')
    prettier({
        config: prettierConfig,
        ...opts,
    })
}

const javascriptCmds = yargs => {
    return yargs
        .command(
            'apply',
            'Apply JS format.',
            yargs => options(yargs),
            argv => handler(argv, true)
        )

        .command(
            'check',
            'Check JS format (do not attempt to fix)',
            yargs => options(yargs),
            argv => handler(argv, false)
        )
}

module.exports = namespace('javascript', {
    aliases: ['js'],
    describe: 'Format javascript according to standards',
    builder: yargs => javascriptCmds(yargs),
})
