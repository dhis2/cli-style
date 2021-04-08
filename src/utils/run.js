const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter
const spawn = require('cross-spawn')
const findup = require('find-up')
const { PACKAGE_ROOT } = require('./paths.js')

exports.spawn = (cmd, args, opts) => {
    log.debug(cmd, args, opts)
    return spawn.sync(cmd, args, {
        stdio: 'inherit',
        ...opts,
    })
}

exports.run = (cmd, { args, opts }, callback) => {
    return handleRun(
        this.spawn(cmd, args, {
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
        this.spawn(binCmd, args, {
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

exports.exit = (code, msg) => {
    if (msg && code > 0) {
        console.log('')
        log.error(msg)
    }
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
