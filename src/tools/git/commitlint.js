const read = require('@commitlint/read')
const load = require('@commitlint/load')
const lint = require('@commitlint/lint')
const { format } = require('@commitlint/format')

const log = require('@dhis2/cli-helpers-engine').reporter

const { COMMITLINT_CONFIG } = require('../../paths.js')

const config = require(COMMITLINT_CONFIG)

module.exports = async (msg = '') => {
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

        return { report, result }
    } catch (err) {
        log.error(err)
        process.exit(1)
    }
}
