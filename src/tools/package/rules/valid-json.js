const log = require('@dhis2/cli-helpers-engine').reporter

module.exports = (file, text, apply = false) => {
    const response = {
        messages: [],
        output: text,
        fixed: false,
    }

    try {
        const pkg = JSON.parse(text)
    } catch (e) {
        log.error(
            `${file} is not valid JSON, cannot proceed with JSON validations. Aborting...\n`,
            e
        )
        process.exit(1)
    }

    return response
}
