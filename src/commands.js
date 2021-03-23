const findup = require('find-up')
const { PACKAGE_ROOT, STYLE_CONFIG_FILES } = require('./utils/paths.js')

const configFile = findup.sync(STYLE_CONFIG_FILES, {
    cwd: PACKAGE_ROOT,
    type: 'file',
    allowSymlinks: true,
})
const config = configFile ? require(configFile) : {}

module.exports = yargs =>
    yargs
        .config({
            patterns: {
                js: '**/*.{js,jsx,ts,tsx}',
                text: '**/*.{md,json,yml,html}',
            },
            files: [],
            ...config,
        })
        .commandDir('commands')
