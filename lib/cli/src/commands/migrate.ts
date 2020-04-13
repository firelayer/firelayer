import { Command, flags } from '@oclif/command'
import { migrate, rollback } from '@firelayer/core/lib/firebase/firestore'
import * as path from 'path'
import * as chalk from 'chalk'
import { prompt } from 'inquirer'
import findRoot from '../utils/findRoot'
import initAdmin from '../helpers/initAdmin'
import getEnv from '../helpers/getEnv'

export default class Migrate extends Command {
  static description = 'run firestore migrations'

  static examples = ['$ firelayer migrate']

  static args = [{ name: 'action' }]

  static flags = {
    help: flags.help({ char: 'h' }),
    yes: flags.boolean({ char: 'y', description: 'skip interactive session' }),
    steps: flags.integer({ char: 's', description: 'rollback the last x steps', default: 1 })
  }

  async run() {
    const { args, flags } = this.parse(Migrate)
    const root = await findRoot()

    process.chdir(root)

    const action = args.action || 'migrate'
    const env = getEnv()

    switch (action) {
    case 'migrate': {
      let continueMigration = flags.yes

      if (!flags.yes) {
        const quiz = await prompt({
          type: 'confirm',
          name: 'confirm',
          message: `Run migrations for environment: '${chalk.bold.cyan(env)}' ?`
        })

        continueMigration = quiz.confirm
      }

      if (continueMigration) {
        this.log(chalk.bold('\nInitializing migrations..\n'))
        initAdmin()

        await migrate(path.join(root, 'database/migrations'))

      }

      return
    }

    case 'rollback': {
      let continueRollback = flags.yes

      if (!flags.yes) {
        const quiz = await prompt({
          type: 'confirm',
          name: 'confirm',
          message: `Rollback the previous ${flags.steps} migration(s) (env: '${chalk.bold.cyan(env)}') ?`
        })

        continueRollback = quiz.confirm
      }

      if (continueRollback) {
        this.log(chalk.bold('\nInitializing rollback..\n'))
        initAdmin()

        await rollback(path.join(root, 'database/migrations'), { steps: flags.steps })
      }

      return
    }

    }
  }
}
