/**
 * This requires that there is a Git binary on $PATH
 *
 * @format
 */

const { spawnSync } = require('child_process')

const log = require('./log.js')

function stage(dir) {
    log.info('Attempt to stage files to Git...')
    const added = spawnSync('git', ['add', '.'], { cwd: dir })
    return added.status
}

module.exports = stage
