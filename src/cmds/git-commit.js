const read = require('@commitlint/read')
const load = require('@commitlint/load')
const lint = require('@commitlint/lint')
const format = require('@commitlint/format')

const log = require('@dhis2/cli-helpers-engine').reporter

exports.command = 'commit <cmd> [msg]'

exports.describe = 'Format commit messages according to standards.'

exports.builder = {
    cmd: {
        describe: 'check or apply style',
        choices: ['check', 'apply'],
        type: 'string',
    },
    msg: {
        describe: 'arbitrary string to use with "check"',
        type: 'string',
    },
}

exports.handler = async function(argv) {
    const config = require('@commitlint/config-conventional')
    const { cmd, msg } = argv

    const check = cmd === 'check'
    const apply = cmd === 'apply'

    if (check && !msg) {
        log.error('A commit msg is required when using check')
        process.exit(1)
    }

    try {
        const opts = await load(config)

        let commit
        if (apply) {
            commit = await read({ edit: true })
        } else {
            commit = [msg]
        }

        const report = await lint(
            commit[0],
            opts.rules,
            opts.parserPreset
                ? { parserOpts: opts.parserPreset.parserOpts }
                : {}
        )

        const result = format({
            valid: report.valid,
            input: report.input,
            results: [report],
        })

        process.stdout.write(result)
        process.stdout.write('\n')

        if (report.valid) {
            process.exit(0)
        } else {
            process.exit(1)
        }
    } catch (err) {
        log.error(err)
        process.exit(1)
    }
}
