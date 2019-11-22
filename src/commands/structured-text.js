const { namespace } = require('@dhis2/cli-helpers-engine')
const log = require('@dhis2/cli-helpers-engine').reporter

const { prettier } = require('../tools/prettier.js')
const { selectFiles } = require('../utils/files.js')
const { sayFilesChecked, sayNoFiles } = require('../utils/std-log-messages.js')

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
            default: false,
        })

const handler = (argv, apply) => {
    const { files, pattern, prettierConfig, staged } = argv

    log.info('d2-style > structured-text')

    const opts = {
        apply,
    }

    opts.files = selectFiles(files, pattern, staged)

    if (opts.files.length === 0) {
        log.print(sayNoFiles('text', pattern, staged))
        return
    }

    log.debug(`Linting files: ${opts.files.join(', ')}`)

    prettier({
        config: prettierConfig,
        ...opts,
    })

    log.print(sayFilesChecked('text', opts.files.length, apply))
}

const textCmds = yargs => {
    return yargs
        .command(
            'apply [files..]',
            'Apply structured text format.',
            yargs => options(yargs),
            argv => handler(argv, true)
        )

        .command(
            'check [files..]',
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
