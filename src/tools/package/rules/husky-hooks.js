const log = require('@dhis2/cli-helpers-engine').reporter
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

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
        'pre-commit': /.*style (validate|(\w+ apply)).*/,
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

function isRootPackage(fp) {
    const dir = path.dirname(fp)
    try {
        // TODO: this won't work if the repo is not cloned by git
        fs.accessSync(path.join(dir, '.git'))
        return true
    } catch (e) {
        return false
    }
}

module.exports = (file, pkg, apply = false) => {
    const response = {
        messages: [],
        output: pkg,
        fixed: false,
    }

    if (!isRootPackage(file)) {
        return response
    }

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
