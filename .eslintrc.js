const { config } = require('./index.js')

module.exports = {
    extends: [config.eslint],

    env: {
        es6: true,
    },
}
