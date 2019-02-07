/**
 * This requires that there is a Git binary on $PATH
 */

const { execSync } = require('child_process')

const log = require('@dhis2/cli-helpers-engine').reporter

exports.stage_files = function stage_files(files, dir) {
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

exports.staged_files = function staged_files(dir) {
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
