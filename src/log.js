/**
 * log level options
 * -----------------
 * 0 = nothing
 * 1 = error
 * 2 = info
 * 3 = debug
 * 4 = trace
 */

const loglevel = 2
const log = {
    error: (msg, ...args) =>
        loglevel > 0 ? console.error('[CODESTYLE]', msg, ...args) : null,
    info: (msg, ...args) =>
        loglevel > 1 ? console.info('[CODESTYLE]', msg, ...args) : null,
    debug: (msg, ...args) =>
        loglevel > 2 ? console.log('[CODESTYLE]', msg, ...args) : null,
    trace: (msg, ...args) =>
        loglevel > 3 ? console.trace(msg, ...args) : null,
}

module.exports = log
