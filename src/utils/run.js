const spawn = require('cross-spawn')

exports.spawn = (cmd, args, opts) =>
    spawn.sync(cmd, args, {
        stdio: 'inherit',
        ...opts,
    })

exports.run = (cmd, args, opts) =>
    handleRun(
        spawn.sync(cmd, args, {
            stdio: 'inherit',
            ...opts,
        })
    )

function handleRun(result) {
    if (result.error) {
        throw result.error
    }

    if (result.status !== 0) {
        process.exit(result.status === null ? 0 : result.status)
    }
}
