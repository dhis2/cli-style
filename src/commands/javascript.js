const { namespace } = require('@dhis2/cli-helpers-engine')
const log = require('@dhis2/cli-helpers-engine').reporter

const { eslint } = require('../tools/eslint.js')
const { prettier } = require('../tools/prettier.js')
const { selectFiles } = require('../utils/files.js')

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
            default: false,
        })

const handler = (argv, apply) => {
    const { files, pattern, eslintConfig, prettierConfig, staged } = argv

    log.info('d2-style > javascript')

    const opts = {
        apply,
    }

    opts.files = selectFiles(files, pattern, staged)

    if (opts.files.length === 0) {
        log.debug('No files to work on...')
        return
    }

    log.debug(`Linting files: ${opts.files.join(', ')}`)

    eslint({
        config: eslintConfig,
        ...opts,
    })

    prettier({
        config: prettierConfig,
        ...opts,
    })
}

const javascriptCmds = yargs => {
    return yargs
        .command(
            'apply [files..]',
            'Apply JS format.',
            yargs => options(yargs),
            argv => handler(argv, true)
        )

        .command(
            'check [files..]',
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
