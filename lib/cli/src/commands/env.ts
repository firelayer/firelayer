import Command from '../base'
import * as fs from 'fs-extra'
import * as chalk from 'chalk'
import cmd from '../utils/cmd'

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

    const envFile = `./config/keys/${envName}.key.json`

    if (fs.existsSync(envFile) || (envName === 'default' && fs.existsSync('./config/keys/key.json'))) {
      this.log(`Setting firebase alias with '${chalk.bold(`firebase use ${envName}`)}'..`)

      await cmd(`firebase use ${envName}`, {
        silent: false
      })

      this.log(`\nSetting '${chalk.bold('.firelayer/env')}' file..`)

      fs.mkdirSync('.firelayer', { recursive: true })
      fs.writeFileSync('.firelayer/env', envName)
    } else {
      const notFound = envName === 'default' ? `key.json or ${envName}.key.json` : `${envName}.key.json`

      return this.log(chalk.bold.red(`\nError: service key '${notFound}' not found in 'config/keys' folder.\n`))
    }

    return this.log(chalk.bold.green(`\nDevelopment environment changed to ${envName}.\n`))
  }
}
