const findup = require('find-up')
const { PACKAGE_ROOT } = require('./utils/paths.js')

const configFile = findup.sync(['d2-style.config.js', 'd2-style.js'], {
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
