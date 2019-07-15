const fix = process.env.CLI_STYLE_FIX === 'true'
const stage = process.env.CLI_STYLE_STAGE === 'true'

module.exports = {
    '*.{js,jsx,ts,tsx}': [
        `./bin/d2-style js ${fix ? 'apply' : 'check'} ${
            fix && stage ? '--stage' : ''
        }`,
    ],
}
