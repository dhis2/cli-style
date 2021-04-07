const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter
const findup = require('find-up')
const { copy, fileExists, deleteFile } = require('./files.js')
const {
    PACKAGE_ROOT,
    PROJECT_ROOT,
    CONFIG_DIR,
    TEMPLATE_DIR,
    STYLE_CONFIG_FILES,
} = require('./paths.js')

/**
 * Configuration files that are bundled in the cli-style package.
 * Can be imported from the main entry-point.
 *
 * Used to either resolve the base configuration file to use, or
 * referenced from a template config file when installed in a project.
 */
const packageConfigs = {
    eslint: path.join(CONFIG_DIR, 'eslint.config.js'),
    eslintReact: path.join(CONFIG_DIR, 'eslint-react.config.js'),
    commitlint: path.join(CONFIG_DIR, 'commitlint.config.js'),
    d2Style: path.join(CONFIG_DIR, 'd2-style.config.js'),
    prettier: path.join(CONFIG_DIR, 'prettier.config.js'),
}

/**
 * The configuration files as they should appear when installed into a
 * project.
 */
const projectConfigs = {
    editorconfig: path.join(PROJECT_ROOT, '.editorconfig'),
    eslint: path.join(PROJECT_ROOT, '.eslintrc.js'),
    prettier: path.join(PROJECT_ROOT, '.prettierrc.js'),
    github: {
        dependabot: path.join(PROJECT_ROOT, '.github', 'dependabot.yml'),
        semantic: path.join(PROJECT_ROOT, '.github', 'semantic.yml'),
        stale: path.join(PROJECT_ROOT, '.github', 'stale.yml'),
    },
}

/**
 * The template configuration files are the config files that are
 * installed into the project as defined by the projectConfig path.
 *
 * We want to be able to update the packageConfig and have those updates
 * automatically propagate to the projectConfig, so we use these
 * templates to refer to the packageConfigs, which can then be
 * customized in the project.
 */
const templateConfigs = {
    editorconfig: {
        base: path.join(TEMPLATE_DIR, 'editorconfig-base.rc'),
    },
    eslint: {
        base: path.join(TEMPLATE_DIR, 'eslint-base.js'),
        react: path.join(TEMPLATE_DIR, 'eslint-react.js'),
    },
    prettier: {
        base: path.join(TEMPLATE_DIR, 'prettier-base.js'),
    },
    github: {
        dependabot: path.join(TEMPLATE_DIR, 'github-dependabot.yml'),
        semantic: path.join(TEMPLATE_DIR, 'github-semantic.yml'),
        stale: path.join(TEMPLATE_DIR, 'github-stale.yml'),
    },
}

/**
 * Add a configuration file to the project based on a template.
 * If there is already a config file, we install a new one next to it
 * with '.new' as the suffix.
 *
 * This allows users to diff old vs. new and see if there are any
 * customizations that need to be brought over.
 */
function add({ tool, template, overwrite = false }) {
    const toolConfig = projectConfig(tool)
    const toolTemplate = templateConfig(tool, template)

    copy(toolTemplate, toolConfig, { overwrite, backup: true })
}

/**
 * Removes a configuration file based on the tool and/or type used.
 *
 * If path is used, then tool and type are ignored.
 */
function remove({ tool, type, path }) {
    const config = !path ? projectConfig(tool, type) : path

    if (fileExists(config)) {
        const result = deleteFile(config)
        result
            ? log.print(`Removed: ${config}`)
            : log.error(`Failed to remove: ${config}`)
    } else {
        log.warn(`Does not exist: ${config}`)
    }
}

const projectConfig = (tool, template) =>
    template ? projectConfigs[tool][template] : projectConfigs[tool]

const templateConfig = (tool, template) =>
    template ? templateConfigs[tool][template] : templateConfigs[tool]

const resolvedStyleConfig = findup.sync(STYLE_CONFIG_FILES, {
    cwd: PACKAGE_ROOT,
    type: 'file',
    allowSymlinks: true,
})
const styleConfig = resolvedStyleConfig ? require(resolvedStyleConfig) : {}

module.exports = {
    remove,
    add,
    projectConfig,
    templateConfig,
    projectConfigs,
    templateConfigs,
    packageConfigs,
    styleConfig,
}
