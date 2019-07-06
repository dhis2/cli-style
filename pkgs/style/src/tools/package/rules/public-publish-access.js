const path = require('path')
const fs = require('fs-extra')

const semver = require('semver')
const chalk = require('chalk')

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

function verify(pkg) {
    const { publishConfig } = pkg

    if (!publishConfig) {
        return {
            checker: 'public-publish-access',
            message: chalk`publishConfig is missing.`,
        }
    }

    if (publishConfig.access !== 'public') {
        return {
            checker: 'public-publish-access',
            message: chalk`publishConfig.access must be set to 'public'.`,
        }
    }

    return null
}

function fix(pkg) {
    return JSON.stringify({
        ...pkg,
        publishConfig: {
            access: 'public',
        },
    })
}

module.exports = (file, pkg, apply = false) => {
    const response = {
        messages: [],
        output: pkg,
        fixed: false,
    }

    if (isRootPackage(file)) {
        return response
    }

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
