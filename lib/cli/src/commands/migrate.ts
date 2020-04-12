import { Command } from '@oclif/command'
import { migrate, rollback } from '@firelayer/core/lib/firebase/firestore'
import * as path from 'path'
import * as chalk from 'chalk'
import findRoot from '../utils/findRoot'
import initAdmin from '../helpers/initAdmin'

export default class Migrate extends Command {
  static description = 'run firestore migrations'

  static examples = ['$ firelayer migrate']

  static args = [{ name: 'name' }]

  async run() {
    const { args } = this.parse(Migrate)
    const root = await findRoot()

    const action = args.name || 'migrate'

    process.chdir(root)

    switch (action) {
    case 'migrate':
      this.log(chalk.bold('\nInitializing migrations..\n'))
      initAdmin()

      await migrate(path.join(root, 'database/migrations'))

      return

    case 'rollback':
      this.log(chalk.bold('\nInitializing rollback..\n'))
      initAdmin()

      await rollback(path.join(root, 'database/migrations'), { steps: 3 })

      return
    }
  }
}
