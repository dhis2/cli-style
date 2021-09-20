const { packageConfigs, styleConfig } = require('./utils/config.js')

module.exports = (yargs) =>
    yargs
        .config({
            config: {
                ...require(packageConfigs.d2Style),
                ...styleConfig,
            },
            files: [],
        })
        .commandDir('commands')
