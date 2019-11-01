const fg = require('fast-glob')

const { namespace } = require('@dhis2/cli-helpers-engine')
const log = require('@dhis2/cli-helpers-engine').reporter

const { prettier } = require('../tools/prettier.js')
const { blacklist, stagedFiles } = require('../files.js')

const options = yargs =>
    yargs
        .option('prettierConfig', {
            describe: 'Prettier config file to use',
            type: 'string',
        })
        .option('pattern', {
            describe:
                'Pattern to match for files, remember to enclose in double quotes!',
            type: 'string',
            default: '**/*.{md,json,yml,html}',
        })
        .option('staged', {
            describe: 'Only check staged files in Git',
            type: 'boolean',
            default: 'false',
        })

const handler = (argv, apply) => {
    const { files, pattern, prettierConfig, staged } = argv

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

    log.info('Running Prettier...')
    prettier({
        config: prettierConfig,
        ...opts,
    })
}

const textCmds = yargs => {
    return yargs
        .command(
            'apply',
            'Apply structured text format.',
            yargs => options(yargs),
            argv => handler(argv, true)
        )

        .command(
            'check',
            'Check structured text format (do not attempt to fix)',
            yargs => options(yargs),
            argv => handler(argv, false)
        )
}

module.exports = namespace('structured-text', {
    aliases: ['text'],
    describe: 'Format structured text according to standards',
    builder: yargs => textCmds(yargs),
})
