const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter
const fs = require('fs-extra')

function copy(from, to, overwrite = true) {
    try {
        const exists = fs.existsSync(to)
        const empty = exists ? fs.statSync(to).size === 0 : false

        const replace = empty ? true : overwrite

        if (exists && !replace) {
            log.print(`Skip existing: ${path.relative(process.cwd(), to)}`)
        } else {
            log.print(`Installing: ${path.relative(process.cwd(), to)}`)
        }
        fs.ensureDirSync(path.dirname(to))
        fs.copySync(from, to, { overwrite: replace })
    } catch (err) {
        log.error(`Failed to install configuration file: ${to}`, err)
    }
}

function configure(repo, group = [''], overwrite) {
    const {
        isValidGroup,
        isValidProject,
        resolveProjectToGroups,
        groupConfigs,
        expandGroupAll,
    } = require('./groups.js')

    const validProjects = group.filter(isValidProject)

    const projectGroups = validProjects
        .map(resolveProjectToGroups)
        .reduce((a, b) => a.concat(b), [])

    const expandedGroups = [...projectGroups, ...group]
        .map(expandGroupAll)
        .reduce((a, b) => a.concat(b), [])

    const groups = [...new Set(expandedGroups)]

    const validGroups = groups.filter(isValidGroup)

    if (validGroups.length !== 0) {
        log.info(`Running setup for group(s): ${validGroups.join('\n * ')}`)
    }

    return validGroups
        .map(groupConfigs)
        .reduce((a, b) => a.concat(b), [])
        .map(c => copy(c[0], c[1], overwrite))
}

module.exports = {
    configure,
}
