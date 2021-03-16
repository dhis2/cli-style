const path = require('path')

const CONSUMING_ROOT = path.join(process.cwd())
const PACKAGE_ROOT = path.join(__dirname, '..', '..')
const CONFIG_DIR = path.join(PACKAGE_ROOT, 'config')

const ESLINT_CONFIG = path.join(CONFIG_DIR, 'js', 'eslint.config.js')
const ESLINT_REACT_CONFIG = path.join(
    CONFIG_DIR,
    'js',
    'eslint-react.config.js'
)
const PRETTIER_CONFIG = path.join(CONFIG_DIR, 'js', 'prettier.config.js')

const BROWSERSLIST_CONFIG = path.join(
    CONFIG_DIR,
    'js',
    'browserslist.config.rc'
)

const COMMITLINT_CONFIG = path.join(CONFIG_DIR, 'commitlint.config.js')
const EDITORCONFIG_CONFIG = path.join(CONFIG_DIR, 'editorconfig.config.rc')
const DEPENDABOT_CONFIG = path.join(CONFIG_DIR, 'github', 'dependabot.yml')
const STALE_CONFIG = path.join(CONFIG_DIR, 'github', 'stale.yml')
const SEMANTIC_PR_CONFIG = path.join(CONFIG_DIR, 'github', 'semantic.yml')
const COMMIT_MSG_HOOK = path.join(CONFIG_DIR, 'git', 'hooks', 'commit-msg')
const PRE_COMMIT_HOOK = path.join(CONFIG_DIR, 'git', 'hooks', 'pre-commit')
const PRE_PUSH_HOOK = path.join(CONFIG_DIR, 'git', 'hooks', 'pre-push')

// local configuration files for repositories
const LOCAL_ESLINT_REACT_CONFIG = path.join(
    CONFIG_DIR,
    'js',
    'eslint-react.local.js'
)
const LOCAL_ESLINT_CONFIG = path.join(CONFIG_DIR, 'js', 'eslint.local.js')

const LOCAL_PRETTIER_CONFIG = path.join(CONFIG_DIR, 'js', 'prettier.local.js')

module.exports = {
    CONSUMING_ROOT,
    COMMIT_MSG_HOOK,
    PRE_COMMIT_HOOK,
    PRE_PUSH_HOOK,
    BROWSERSLIST_CONFIG,
    COMMITLINT_CONFIG,
    PACKAGE_ROOT,
    CONFIG_DIR,
    DEPENDABOT_CONFIG,
    EDITORCONFIG_CONFIG,
    ESLINT_CONFIG,
    ESLINT_REACT_CONFIG,
    LOCAL_ESLINT_CONFIG,
    LOCAL_ESLINT_REACT_CONFIG,
    LOCAL_PRETTIER_CONFIG,
    PRETTIER_CONFIG,
    SEMANTIC_PR_CONFIG,
    STALE_CONFIG,
}
