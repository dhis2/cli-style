const path = require('path')
const log = require('@dhis2/cli-helpers-engine').reporter
const { husky, isSupportedHook } = require('../tools/husky.js')
const { fileExists, deleteFile } = require('../utils/files.js')
const { LOCAL_HOOKS_DIR } = require('../utils/paths.js')
const { callback, exit } = require('../utils/run.js')

const statusCode = callback()

exports.command = 'install'

exports.describe = 'Install DHIS2 configurations'

exports.builder = yargs => this.installcmd(yargs)
//.command(require('./types/javascript.js'))

exports.installcmd = yargs =>
    yargs.command(
        '$0',
        'default',
        yargs =>
            yargs.option('clean', {
                describe: '',
                type: 'boolean',
            }),
        argv => {
            const { config, clean } = argv

            if (clean && fileExists(LOCAL_HOOKS_DIR)) {
                const result = deleteFile(LOCAL_HOOKS_DIR)
                log.debug(`Deleted ${LOCAL_HOOKS_DIR}: ${result}`)
            }

            if (config.hooks) {
                log.info('git-hooks > husky')
                husky({
                    command: 'install',
                    callback: statusCode,
                })

                /*
                 * If there are no hooks locally, but we have hooks defined
                 * in the configuration, we will install those in the repo.
                 */

                for (const hookType in config.hooks) {
                    const hookPath = path.join(LOCAL_HOOKS_DIR, hookType)
                    if (isSupportedHook(hookType) && !fileExists(hookPath)) {
                        const hookCmds = config.hooks[hookType]

                        hookCmds.map(hookCmd =>
                            husky({
                                command: 'add',
                                hookType,
                                hookCmd,
                                callback: statusCode,
                            })
                        )
                    }
                }

                if (statusCode() === 0) {
                    log.print('Install completed successfully')
                }
            }

            exit(statusCode())
        }
    )
