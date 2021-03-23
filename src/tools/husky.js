const { join } = require('path')
const { LOCAL_HOOKS_DIR } = require('../utils/paths.js')
const { bin, exit } = require('../utils/run.js')

// https://git-scm.com/docs/githooks
const supportedHooks = [
    'applypatch-msg',
    'pre-applypatch',
    'post-applypatch',
    'pre-commit',
    'pre-merge-commit',
    'prepare-commit-msg',
    'commit-msg',
    'post-commit',
    'pre-rebase',
    'post-checkout',
    'post-merge',
    'pre-push',
    'pre-receive',
    'update',
    'proc-receive',
    'post-receive',
    'post-update',
    'reference-transaction',
    'push-to-checkout',
    'pre-auto-gc',
    'post-rewrite',
    'sendemail-validate',
    'fsmonitor-watchman',
    'p4-changelist',
    'p4-prepare-changelist',
    'p4-post-changelist',
    'p4-pre-submit',
    'post-index-change',
]

exports.husky = ({ command, hookType, hookCmd, callback }) => {
    if (!supportedHooks.includes(hookType)) {
        exit(1, 'Unsupported hook')
    }

    const cmd = 'husky'
    const args = [
        command,
        ...(command === 'install' ? [LOCAL_HOOKS_DIR] : []),
        ...(['set', 'add'].includes(command)
            ? [join(LOCAL_HOOKS_DIR, hookType)]
            : []),
        ...(hookCmd ? [hookCmd] : []),
    ]

    bin(cmd, { args }, callback)
}
