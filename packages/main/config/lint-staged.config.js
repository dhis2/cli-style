const path = require('path')

const fix = process.env.CLI_STYLE_FIX === 'true'
const stage = process.env.CLI_STYLE_STAGE === 'true'
const all = process.env.CLI_STYLE_ALL === 'true'

const prettierCmd = `prettier ${
    fix ? '--write' : '--check'
} --config ${path.resolve(__dirname, 'js', 'prettier.config.js')}`

const eslintCmd = `eslint ${fix ? '--fix' : ''} --config ${path.resolve(
    __dirname,
    'js',
    'eslint.config.js'
)}`

const gitAdd = `git add`

// TODO: add support for groups
module.exports = {
    '*.{js,jsx,ts,tsx,json,md,yaml}': [prettierCmd, ...(stage ? [gitAdd] : [])],
    '*.{js,jsx,ts,tsx}': [eslintCmd, ...(stage ? [gitAdd] : [])],
}
