const { join } = require('path')
const { bin } = require('@dhis2/cli-helpers-engine').exec
const { PACKAGE_ROOT, PROJECT_HOOKS_DIR } = require('../utils/paths.js')

// subset of https://git-scm.com/docs/githooks
exports.supportedHooks = [
    'pre-commit',
    'commit-msg',
    'post-commit',
    'post-checkout',
    'post-merge',
    'pre-push',
    'update',
    'post-update',
]

exports.isSupportedHook = (hook) => this.supportedHooks.includes(hook)

exports.husky = ({ command, hookType, hookCmd, callback }) => {
    const cmd = 'husky'
    const cwd = PACKAGE_ROOT
    const args = [
        command,
        ...(command === 'install' ? [PROJECT_HOOKS_DIR] : []),
        ...(['set', 'add'].includes(command)
            ? [join(PROJECT_HOOKS_DIR, hookType)]
            : []),
        ...(hookCmd ? [hookCmd] : []),
    ]

    bin(cmd, { args, cwd }, callback)
}
