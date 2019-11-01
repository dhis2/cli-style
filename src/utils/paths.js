const path = require('path')

const CONSUMING_ROOT = path.join(process.cwd())
const CONFIG_ROOT = path.join(__dirname, '..', '..')
const CONFIG_DIR = path.join(CONFIG_ROOT, 'config')

const ESLINT_CONFIG = path.join(CONFIG_DIR, 'js', 'eslint.config.js')
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
const LEFTHOOK_FRONTEND_CONFIG = path.join(
    CONFIG_DIR,
    'lefthook-frontend.config.yml'
)
const LEFTHOOK_BACKEND_CONFIG = path.join(
    CONFIG_DIR,
    'lefthook-backend.config.yml'
)

// local configuration files for repositories
const LOCAL_ESLINT_CONFIG = path.join(CONFIG_DIR, 'js', 'eslint.local.js')
const LOCAL_PRETTIER_CONFIG = path.join(CONFIG_DIR, 'js', 'prettier.local.js')
const LOCAL_LEFTHOOK_FRONTEND_CONFIG = path.join(
    CONFIG_DIR,
    'lefthook-frontend.local.yml'
)
const LOCAL_LEFTHOOK_BACKEND_CONFIG = path.join(
    CONFIG_DIR,
    'lefthook-backend.local.yml'
)

module.exports = {
    CONSUMING_ROOT,
    BROWSERSLIST_CONFIG,
    COMMITLINT_CONFIG,
    CONFIG_ROOT,
    CONFIG_DIR,
    DEPENDABOT_CONFIG,
    EDITORCONFIG_CONFIG,
    ESLINT_CONFIG,
    LOCAL_ESLINT_CONFIG,
    LOCAL_PRETTIER_CONFIG,
    PRETTIER_CONFIG,
    SEMANTIC_PR_CONFIG,
    STALE_CONFIG,
    LEFTHOOK_FRONTEND_CONFIG,
    LEFTHOOK_BACKEND_CONFIG,
    LOCAL_LEFTHOOK_FRONTEND_CONFIG,
    LOCAL_LEFTHOOK_BACKEND_CONFIG,
}
