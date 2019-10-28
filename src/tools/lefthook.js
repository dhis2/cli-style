const path = require('path')
const fs = require('fs-extra')
const log = require('@dhis2/cli-helpers-engine').reporter

const { run } = require('../utils/run.js')

exports.lefthook = ({ command }) => {
    const cmd = 'npx'
    const args = ['--no-install', 'lefthook', command]

    const exists = fs.existsSync(path.join(process.cwd(), 'lefthook.yml'))

    if (command === 'install' && !exists) {
        log.warn(
            'No configuration for Lefthook exists, skipping hook installation.'
        )
        return
    }

    run(cmd, args)
}
