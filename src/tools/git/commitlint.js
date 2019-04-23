const read = require('@commitlint/read')
const load = require('@commitlint/load')
const lint = require('@commitlint/lint')
const format = require('@commitlint/format')
const config = require('@commitlint/config-conventional')

const log = require('@dhis2/cli-helpers-engine').reporter

module.exports = async function check(msg = '') {
    try {
        const opts = await load(config)

        let commit
        if (msg) {
            commit = [msg]
        } else {
            commit = await read({ edit: true })
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

        log.print(result)

        return report
    } catch (err) {
        log.error(err)
        process.exit(1)
    }
}
