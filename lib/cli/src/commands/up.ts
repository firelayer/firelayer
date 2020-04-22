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
      const databaseRules = fs.readFileSync('./rules/database.rules.json', 'utf8')
      const firestoreRules = fs.readFileSync('./rules/firestore.rules', 'utf8')
      const storageRules = fs.readFileSync('./rules/storage.rules', 'utf8')

      await stopMaintenance({
        useRules: true,
        database: {
          rules: databaseRules,
          enabled: true
        },
        firestore:{
          rules: firestoreRules,
          enabled: true
        },
        storage: {
          rules: storageRules,
          enabled: true
        }
      })

      this.log(chalk.green(`\nApplication is now live! (env: ${chalk.bold(this.env)}).\n`))
      process.exit(0)
    } else {
      this.log(chalk.yellow(`\nApplication is not in maintenance mode (env: ${chalk.bold(this.env)}).\n`))
      process.exit(0)
    }
  }
}
