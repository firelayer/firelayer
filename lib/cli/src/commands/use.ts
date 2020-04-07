import { Command, flags } from '@oclif/command'
import cmd from '../utils/cmd'
import * as fs from 'fs-extra'
import * as chalk from 'chalk'
import * as path from 'path'

export default class Use extends Command {
  static description = 'change development environment'

  static examples = ['$ firelayer use default']

  static args = [{ name: 'name' }]

  async run() {
    const { args } = this.parse(Use)
    const envName = args.name

    const cwd = path.join(process.cwd(), 'environments')
    const envPath = path.resolve(cwd, `${envName}.key.json`)

    if (fs.existsSync(envPath)) {
      this.log(`Setting firebase alias with '${chalk.bold(`firebase use ${envName}`)}'..`)

      await cmd(`firebase use ${envName}`, {
        silent: false
      })

      this.log(`\nSetting '${chalk.bold('.firelayer/env')}' file..`)

      fs.mkdirSync('.firelayer', { recursive: true })
      fs.writeFileSync('.firelayer/env', envName)
    } else {
      this.log(chalk.bold.red(`\nError: service key '${envName}.key.json' not found in 'environments' folder.\n`))

      return
    }

    this.log(chalk.bold.green(`\nDevelopment environment changed to ${envName}.\n`))
  }
}
