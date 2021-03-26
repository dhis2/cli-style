const path = require('path')
const findup = require('find-up')

const CONSUMING_ROOT = path.join(process.cwd())
const PACKAGE_ROOT = path.join(__dirname, '..', '..')

const PROJECT_ROOT = findup.sync(
    directory => {
        const amiroot = ['.git', '.github', '.d2'].map(i =>
            findup.sync.exists(path.join(directory, i))
        )
        return amiroot.includes(true) && directory
    },
    {
        cwd: CONSUMING_ROOT,
        type: 'directory',
    }
)

const CONFIG_DIR = path.join(PACKAGE_ROOT, 'config')
const TEMPLATE_DIR = path.join(PACKAGE_ROOT, 'templates')

const PROJECT_CONFIG_DIR = path.join(CONSUMING_ROOT, '.d2')
const PROJECT_HOOKS_DIR = path.join(PROJECT_CONFIG_DIR, 'hooks')

const STYLE_CONFIG_FILES = [
    path.join('.d2', 'style.config.js'),
    path.join('.d2', 'style.js'),
    'd2-style.config.js',
    'd2-style.js',
]

module.exports = {
    CONSUMING_ROOT,
    PACKAGE_ROOT,
    CONFIG_DIR,
    STYLE_CONFIG_FILES,
    PROJECT_CONFIG_DIR,
    PROJECT_HOOKS_DIR,
    PROJECT_ROOT,
    TEMPLATE_DIR,
}
