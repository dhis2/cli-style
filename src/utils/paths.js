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

// local configuration files for repositories
const LOCAL_ESLINT_REACT_CONFIG = path.join(
    CONFIG_DIR,
    'js',
    'eslint-react.local.js'
)
const LOCAL_ESLINT_CONFIG = path.join(CONFIG_DIR, 'js', 'eslint.local.js')
const LOCAL_PRETTIER_CONFIG = path.join(CONFIG_DIR, 'js', 'prettier.local.js')

const LOCAL_CONFIG_DIR = path.join(CONSUMING_ROOT, '.d2')
const LOCAL_HOOKS_DIR = path.join(LOCAL_CONFIG_DIR, 'hooks')

const STYLE_CONFIG_FILES = [
    path.join('.d2', 'style.config.js'),
    path.join('.d2', 'style.js'),
    'd2-style.config.js',
    'd2-style.js',
]

module.exports = {
    CONSUMING_ROOT,
    BROWSERSLIST_CONFIG,
    COMMITLINT_CONFIG,
    PACKAGE_ROOT,
    CONFIG_DIR,
    STYLE_CONFIG_FILES,
    DEPENDABOT_CONFIG,
    EDITORCONFIG_CONFIG,
    ESLINT_CONFIG,
    ESLINT_REACT_CONFIG,
    LOCAL_CONFIG_DIR,
    LOCAL_HOOKS_DIR,
    LOCAL_ESLINT_CONFIG,
    LOCAL_ESLINT_REACT_CONFIG,
    LOCAL_PRETTIER_CONFIG,
    PRETTIER_CONFIG,
    SEMANTIC_PR_CONFIG,
    STALE_CONFIG,
}
