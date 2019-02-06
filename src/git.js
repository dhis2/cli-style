/**
 * This requires that there is a Git binary on $PATH
 */

const { execSync } = require('child_process')

const log = require('./log.js')

function stage(files, dir) {
    log.info(`Stage ${files.length} file(s).`)
    return files.map(file => {
        log.info(`Staging ${file}...`)
        const added = execSync(`git add ${file}`, {
            cwd: dir,
            encoding: 'utf8',
        })
        log.debug(added)
        return file
    })
}

function staged(dir) {
    const files = execSync('git diff --cached --name-only', {
        cwd: dir,
        encoding: 'utf8',
    }).trim()
    if (!!files) {
        const s = files.split('\n')
        log.info(`Fetching staged files: ${s.length} file(s).`)
        return s
    }
    log.info('No staged files found.')
    return []
}

module.exports = { stage, staged }
