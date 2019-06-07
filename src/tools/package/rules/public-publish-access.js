const semver = require('semver')
const chalk = require('chalk')

function verify(pkg) {
    const { publishConfig } = pkg

    if (!publishConfig) {
        return {
            checker: 'public-publish-access',
            message: chalk`publishConfig is missing.`,
        }
    }

    return null
}

function fix(pkg) {
    return JSON.stringify(
        {
            ...pkg,
            publishConfig: {
                access: 'public',
            },
        },
        null,
        4
    )
}

module.exports = (file, text, apply = false) => {
    const response = {
        messages: [],
        output: text,
        fixed: false,
    }

    const pkg = JSON.parse(text)

    const result = verify(pkg)

    if (result) {
        if (apply) {
            const fixed = fix(pkg)
            response.output = fixed
            response.fixed = true
        } else {
            response.messages.push(result)
        }
    }

    return response
}
