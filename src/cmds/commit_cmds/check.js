const log = require('@dhis2/cli-helpers-engine').reporter

const { commitlint } = require('../../tools/commitlint.js')

exports.command = 'check'

exports.describe = 'Checks commit messages according to standards.'

exports.builder = {
    commitlintConfig: {
        describe: 'Commitlint config file to use',
        type: 'string',
    },
}

exports.handler = function(argv) {
    commitlint(argv.commitlintConfig)
}
