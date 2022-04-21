const path = require('path')
const findup = require('find-up')

const CONSUMING_ROOT = path.join(process.cwd())

const PACKAGE_ROOT = path.join(__dirname, '..', '..')
const CONFIG_DIR = path.join(PACKAGE_ROOT, 'config')
const TEMPLATE_DIR = path.join(PACKAGE_ROOT, 'templates')

const PROJECT_ROOT =
    findup.sync(
        (directory) => {
            const amiroot = [
                '.git',
                '.github',
                'yarn.lock',
                'package-lock.json',
            ].map((i) => findup.sync.exists(path.join(directory, i)))
            return amiroot.includes(true) && directory
        },
        {
            cwd: CONSUMING_ROOT,
            type: 'directory',
        }
    ) || CONSUMING_ROOT

const GIT_DIR = path.join(PROJECT_ROOT, '.git')
const PROJECT_HOOKS_DIR = path.join(PROJECT_ROOT, '.hooks')

const STYLE_CONFIG_FILES = ['d2-style.config.js', 'd2-style.js']

const DEPRECATED_CONFIGS = [
    path.join(PROJECT_ROOT, '.huskyrc.js'),
    path.join(PROJECT_ROOT, '.github', 'semantic.yml'),
]

module.exports = {
    CONSUMING_ROOT,
    PACKAGE_ROOT,
    CONFIG_DIR,
    STYLE_CONFIG_FILES,
    PROJECT_HOOKS_DIR,
    PROJECT_ROOT,
    TEMPLATE_DIR,
    DEPRECATED_CONFIGS,
    GIT_DIR,
}
