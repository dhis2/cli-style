const read = require('@commitlint/read')
const load = require('@commitlint/load')
const lint = require('@commitlint/lint')
const format = require('@commitlint/format')

exports.command = '$0'

exports.describe = 'Format commit messages according to DHIS2 rules.'

exports.builder = {}

exports.handler = async function(argv) {
    const config = require('@commitlint/config-conventional')

    try {
        const opts = await load(config)
        const commit = await read({ edit: true })

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
        process.stderr.write(err)
        process.exit(1)
    }
}

