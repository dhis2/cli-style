const path = require('path')
const spawn = require('cross-spawn')
const findup = require('find-up')
const { PACKAGE_ROOT } = require('./paths.js')

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

exports.bin = (cmd, { args, opts }, callback) => {
    const nodemodules = findup.sync('node_modules', {
        cwd: PACKAGE_ROOT,
        type: 'directory',
        allowSymlinks: true,
    })

    const binCmd = path.join(nodemodules, '.bin', cmd)

    return handleRun(
        spawn.sync(binCmd, args, {
            stdio: 'inherit',
            ...opts,
        }),
        callback
    )
}

exports.callback = () => {
    let status = 0
    return result => {
        if (!result) return status

        if (result.status > status) {
            status = result.status
        }
    }
}

exports.exit = code => {
    console.log('')
    process.exit(code)
}

function handleRun(result, callback) {
    if (result.error) {
        throw result.error
    }

    if (callback) {
        return callback(result)
    }

    if (result.status !== 0) {
        process.exit(result.status === null ? 0 : result.status)
    }
}
