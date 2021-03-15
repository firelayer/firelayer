import Command from '../base'
import { stopMaintenance, isInMaintenance } from '@firelayer/core/lib/firebase'
import * as chalk from 'chalk'
import * as fs from 'fs-extra'
import initAdmin from '../helpers/initAdmin'

export default class Up extends Command {
  static description = 'bring the application out of maintenance mode'

  static examples = ['$ firelayer up']

  async run() {
    initAdmin()

    if (await isInMaintenance()) {
      this.log(`\nBringing the application from maintenance mode! (env: ${chalk.bold(this.env)}).`)

      // stop maintenance and deploy repo rules
      const stopOptions = {
        useRules: true,
        database: {
          rules: '',
          enabled: false,
        },
        firestore: {
          rules: '',
          enabled: false,
        },
        storage: {
          rules: '',
          enabled: false,
        },
      }

      if (fs.existsSync('./rules/database.rules.json')) {
        stopOptions.database = {
          rules: fs.readFileSync('./rules/database.rules.json', 'utf8'),
          enabled: true,
        }
      }

      if (fs.existsSync('./rules/firestore.rules')) {
        stopOptions.firestore = {
          rules: fs.readFileSync('./rules/firestore.rules', 'utf8'),
          enabled: true,
        }
      }

      if (fs.existsSync('./rules/storage.rules')) {
        stopOptions.storage = {
          rules: fs.readFileSync('./rules/storage.rules', 'utf8'),
          enabled: true,
        }
      }

      await stopMaintenance(stopOptions)

      this.log(chalk.green(`\nApplication is now live! (env: ${chalk.bold(this.env)}).\n`))
      process.exit(0)
    } else {
      this.log(chalk.yellow(`\nApplication is not in maintenance mode (env: ${chalk.bold(this.env)}).\n`))
      process.exit(0)
    }
  }
}
