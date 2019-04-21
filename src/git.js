/**
 * This requires that there is a Git binary on $PATH
 */

const { execSync } = require('child_process')

const log = require('@dhis2/cli-helpers-engine').reporter

const stage_file = (file, dir) => {
    log.debug(`Staging ${file}...`)
    const added = execSync(`git add ${file}`, {
        cwd: dir,
        encoding: 'utf8',
    })
    return file
}

const stage_files = (files, dir) => {
    const staged = files.map(f => stage_file(f, dir))
    log.info(`Staged ${files.length} file(s).`)
    return staged
}

const staged_files = dir => {
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

module.exports = {
    staged_files,
    stage_files,
    stage_file,
}
