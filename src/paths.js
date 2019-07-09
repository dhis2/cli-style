const path = require('path')

const CONSUMING_ROOT = path.join(process.cwd())
const CONFIG_ROOT = path.join(__dirname, '..')
const CONFIG_DIR = path.join(CONFIG_ROOT, 'config')

const ESLINT_CONFIG = path.join(CONFIG_DIR, 'js', 'eslint.config.js')
const PRETTIER_CONFIG = path.join(CONFIG_DIR, 'js', 'prettier.config.js')
const LINT_STAGED_CONFIG = path.join(CONFIG_DIR, 'lint-staged.config.js')

const BROWSERSLIST_CONFIG = path.join(
    CONFIG_DIR,
    'js',
    'browserslist.config.rc'
)

const COMMITLINT_CONFIG = path.join(CONFIG_DIR, 'commitlint.config.js')
const EDITORCONFIG_CONFIG = path.join(CONFIG_DIR, 'editorconfig.config.rc')
const DEPENDABOT_CONFIG = path.join(CONFIG_DIR, 'github', 'dependabot.yml')
const HUSKY_CONFIG = path.join(CONFIG_DIR, 'husky.config.js')
const STALE_CONFIG = path.join(CONFIG_DIR, 'github', 'stale.yml')
const SEMANTIC_PR_CONFIG = path.join(CONFIG_DIR, 'github', 'semantic.yml')

// local configuration files for repositories
const LOCAL_ESLINT_CONFIG = path.join(CONFIG_DIR, 'js', 'eslint.local.rc')
const LOCAL_PRETTIER_CONFIG = path.join(CONFIG_DIR, 'js', 'prettier.local.js')
const LOCAL_HUSKY_CONFIG = path.join(CONFIG_DIR, 'husky.local.js')

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
    LOCAL_HUSKY_CONFIG,
    LOCAL_PRETTIER_CONFIG,
    LINT_STAGED_CONFIG,
    PRETTIER_CONFIG,
    SEMANTIC_PR_CONFIG,
    STALE_CONFIG,
    HUSKY_CONFIG,
}
