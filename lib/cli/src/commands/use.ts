import { Command, flags } from '@oclif/command'
import findRoot from '../utils/findRoot'
import cmd from '../utils/cmd'
import * as fs from 'fs-extra'
import * as chalk from 'chalk'

export default class Use extends Command {
  static description = 'change development environment'

  static examples = ['$ firelayer use default']

  static args = [{ name: 'name', required: true }]

  async run() {
    const { args } = this.parse(Use)
    const envName = args.name
    const root = await findRoot()

    process.chdir(root)

    const envFile = `./configs/keys/${envName}.key.json`

    if (fs.existsSync(envFile) || (envName === 'default' && fs.existsSync('./configs/keys/key.json'))) {
      this.log(`Setting firebase alias with '${chalk.bold(`firebase use ${envName}`)}'..`)

      await cmd(`firebase use ${envName}`, {
        silent: false
      })

      this.log(`\nSetting '${chalk.bold('.firelayer/env')}' file..`)

      fs.mkdirSync('.firelayer', { recursive: true })
      fs.writeFileSync('.firelayer/env', envName)
    } else {
      const notFound = envName === 'default' ? `key.json or ${envName}.key.json` : `${envName}.key.json`

      return this.log(chalk.bold.red(`\nError: service key '${notFound}' not found in 'configs/keys' folder.\n`))
    }

    return this.log(chalk.bold.green(`\nDevelopment environment changed to ${envName}.\n`))
  }
}
