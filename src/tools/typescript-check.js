const path = require('path')
const { bin } = require('@dhis2/cli-helpers-engine').exec
const { fileExists } = require('../utils/files.js')
const { PROJECT_ROOT } = require('../utils/paths.js')

exports.typescriptCheck = () => {
    const cmd = 'tsc'
    const tsconfigFile = path.join(PROJECT_ROOT, 'tsconfig.json')

    if (fileExists(tsconfigFile)) {
        bin(cmd, { args: ['--noEmit'], PROJECT_ROOT })
    }
}
