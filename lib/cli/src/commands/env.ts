import Command from '../base'
import * as fs from 'fs-extra'
import * as chalk from 'chalk'
import * as firebaseCLI from 'firebase-tools'
import fireWrap from '../helpers/fireWrap'
import logger from '../utils/logger'

export default class Env extends Command {
  static description = 'change development environment'

  static examples = ['$ firelayer env default']

  static args = [{ name: 'name' }]

  async run() {
    const { args } = this.parse(Env)
    const envName = args.name

    if (!envName) {
      return this.log(`\nCurrent environment: ${chalk.bold.cyan(this.env)}\n`)
    }

    const envFile = `./config/keys/key.${envName}.json`

    if (fs.existsSync(envFile) || (envName === 'default' && fs.existsSync('./config/keys/key.json'))) {
      this.log(`Setting firebase alias with '${chalk.bold(`firebase use ${envName}`)}'..`)

      await fireWrap(() => firebaseCLI.use(envName, {}))

      this.log(`\nSetting '${chalk.bold('.firelayer/env')}' file..`)

      fs.mkdirSync('.firelayer', { recursive: true })
      fs.writeFileSync('.firelayer/env', envName)
    } else {
      const notFound = envName === 'default' ? `key.json or key.${envName}.json` : `key.${envName}.json`
      const message = `\nError: service key '${notFound}' not found in 'config/keys' folder.\n`

      logger('env', message)

      return this.log(chalk.bold.red(message))
    }

    return this.log(chalk.bold.green(`\nDevelopment environment changed to ${envName}.\n`))
  }
}
