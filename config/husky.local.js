const { config } = require('@dhis2/cli-style')

module.exports = {
    hooks: {
        ...config.husky.hooks,
    },
}
