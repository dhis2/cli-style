const path = require('path')
const fs = require('fs-extra')

const log = require('@dhis2/cli-helpers-engine').reporter

const { readFile, writeFile } = require('./files.js')

function copy(from, to, overwrite = true) {
    try {
        if (fs.existsSync(to) && !overwrite) {
            log.warn(
                `Skip existing configuration file: ${path.relative(
                    process.cwd(),
                    to
                )}`
            )
        } else {
            log.info(
                `Installing configuration file: ${path.relative(
                    process.cwd(),
                    to
                )}`
            )
        }
        fs.ensureDirSync(path.dirname(to))
        fs.copySync(from, to, { overwrite })
    } catch (err) {
        log.error(`Failed to install configuration file: ${to}`, err)
    }
}

function configure(repo, group = [''], overwrite) {
    const { groups, isValidGroup } = require('./groups.js')
    const validGroups = group.filter(isValidGroup)

    if (validGroups.length === 0) {
        log.warn(
            `No valid group selected, available groups:\n ${Object.keys(
                groups
            ).join('\n ')}`
        )
    } else {
        log.info(`Running setup for group(s): ${validGroups.join(', ')}`)
    }

    return validGroups.map(g =>
        groups[g].configs.map(c => copy(c[0], c[1], overwrite))
    )
}

module.exports = {
    configure,
}
