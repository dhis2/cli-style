const { config } = require('./index.js')

module.exports = {
    ...require(config.prettier),
}
