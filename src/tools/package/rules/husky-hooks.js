const log = require('@dhis2/cli-helpers-engine').reporter
const chalk = require('chalk')

function isEmpty(obj) {
    for (const x in obj) {
        return false
    }
    return true
}

function message(msg) {
    return {
        checker: 'husky-hooks',
        message: msg,
    }
}

function validate(hook, cmd) {
    const rules = {
        'commit-msg': /.*style commit check.*/,
        'pre-commit': /.*style \w+ apply.*/,
    }

    if (!rules[hook].test(cmd)) {
        return message(
            chalk`The hook {yellow ${hook}} needs to run the style rules ({green ${
                rules[hook]
            }})`
        )
    } else {
        return null
    }
}

module.exports = (file, text, apply = false) => {
    const response = {
        messages: [],
        output: text,
        fixed: false,
    }

    const pkg = JSON.parse(text)

    const { husky } = pkg

    if (husky) {
        if (isEmpty(husky.hooks)) {
            response.messages.push(
                message(chalk`No Hooks found in {yellow husky.hooks}.`)
            )
        }

        for (const hook in husky.hooks) {
            const result = validate(hook, husky.hooks[hook])
            if (result) {
                response.messages.push(result)
            }
        }
    } else {
        response.messages.push(
            message(chalk`No {yellow husky} property found.`)
        )
    }

    return response
}
