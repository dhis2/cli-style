const path = require('path')
const fs = require('fs')
const spawn = require('cross-spawn')

exports.spawn = (cmd, args, opts) =>
    spawn.sync(cmd, args, {
        stdio: 'inherit',
        ...opts,
    })

exports.run = (cmd, { args, opts }, callback) => {
    return handleRun(
        spawn.sync(cmd, args, {
            stdio: 'inherit',
            ...opts,
        }),
        callback
    )
}

exports.bin = (packageName, { bin, args, opts }, callback) => {
    const binFile = findBin(packageName, bin)
    const yarnArgs = ['node', binFile, ...args]

    return handleRun(
        spawn.sync('yarn', yarnArgs, {
            stdio: 'inherit',
            ...opts,
        }),
        callback
    )
}

function findBin(packageName, bin) {
    let pkg
    try {
        pkg = require(`${packageName}/package.json`)
    } catch (e) {
        throw new Error(`Cannot resolve package ${packageName}`)
    }
    const pkgRoot = path.dirname(require.resolve(`${packageName}/package.json`))

    const binName = bin || packageName
    let binFile
    if (typeof pkg.bin === 'string') {
        if (binName === packageName) {
            binFile = pkg.bin
        }
    } else {
        binFile = pkg.bin[binName]
    }

    if (!binFile) {
        throw new Error(
            `No bin entry for ${binName} found in package ${packageName}`
        )
    }

    binFile = path.join(pkgRoot, binFile)
    if (!fs.existsSync(binFile)) {
        throw new Error(
            `Bin entry ${binName} in package ${packageName} points to a file which does not exist (${binFile})`
        )
    }

    return binFile
}

function handleRun(result, callback) {
    if (result.error) {
        throw result.error
    }

    if (callback) {
        callback(result)
    }

    if (result.status !== 0) {
        process.exit(result.status === null ? 0 : result.status)
    }
}
