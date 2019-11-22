const semver = require('semver')
const { chalk } = require('@dhis2/cli-helpers-engine')

function verify(dependency, version, category) {
    if (dependency.startsWith('@dhis2')) {
        // semver.clean produces an exact version
        // https://github.com/npm/node-semver/blob/master/test/clean.js#L18-L21
        const clean = semver.clean(version)
        if (!clean) {
            return {
                checker: 'pin-dhis2-package-version',
                message: chalk`${dependency}@{red ${version}} in {yellow ${category}} should be exact version.`,
            }
        }
    }
    return null
}

module.exports = (file, pkg, apply = false) => {
    const response = {
        messages: [],
        output: pkg,
        fixed: false,
    }

    const { dependencies, peerDependencies, devDependencies } = pkg

    for (const dep in dependencies) {
        const ver = dependencies[dep]
        const result = verify(dep, ver, 'dependencies')
        if (result) {
            response.messages.push(result)
        }
    }

    for (const dep in devDependencies) {
        const ver = devDependencies[dep]
        const result = verify(dep, ver, 'devDependencies')
        if (result) {
            response.messages.push(result)
        }
    }

    for (const dep in peerDependencies) {
        const ver = peerDependencies[dep]
        const result = verify(dep, ver, 'peerDependencies')
        if (result) {
            response.messages.push(result)
        }
    }

    return response
}
