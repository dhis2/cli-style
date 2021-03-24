const findup = require('find-up')
const {
    PACKAGE_ROOT,
    D2_STYLE_CONFIG,
    STYLE_CONFIG_FILES,
} = require('./utils/paths.js')

const configFile = findup.sync(STYLE_CONFIG_FILES, {
    cwd: PACKAGE_ROOT,
    type: 'file',
    allowSymlinks: true,
})
const config = configFile ? require(configFile) : {}

module.exports = yargs =>
    yargs
        .config({
            config: {
                ...require(D2_STYLE_CONFIG),
                ...config,
            },
            files: [],
        })
        .commandDir('commands')
