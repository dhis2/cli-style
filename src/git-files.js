/**
 * This requires that there is a Git binary on $PATH
 */
const { execSync } = require('child_process')

const log = require('@dhis2/cli-helpers-engine').reporter

const stashUnstagedChanges = dir => {
    log.debug('Stashing all unstaged changes')
    execSync('git stash --keep-index --include-tracked', {
        cwd: dir,
        encoding: 'utf8',
    })
}

const popStash = dir => {
    log.debug(
        'Remove latest sashed state and apply to current working tree state'
    )
    execSync('git stash pop', {
        cwd: dir,
        encoding: 'utf8',
    })
}

const stageFile = (file, dir) => {
    log.debug(`Staging ${file}...`)
    const added = execSync(`git add ${file}`, {
        cwd: dir,
        encoding: 'utf8',
    })
    return file
}

const stageFiles = (files, dir) => {
    const staged = files.map(f => stageFile(f, dir))
    log.info(`Staged ${files.length} file(s).`)
    return staged
}

const stagedFiles = dir => {
    const files = execSync(
        'git diff --cached --name-only --relative --diff-filter=d',
        {
            cwd: dir,
            encoding: 'utf8',
        }
    ).trim()

    if (!!files) {
        const s = files.split('\n')
        log.info(`Fetching staged files: ${s.length} file(s).`)
        return s
    }

    log.info('No staged files found.')
    return []
}

module.exports = {
    stashUnstagedChanges,
    stagedFiles,
    stageFiles,
    stageFile,
    popStash,
}
