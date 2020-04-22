import { flags } from '@oclif/command'
import Command from '../../base'
import * as path from 'path'
import * as chalk from 'chalk'
import { prompt } from 'inquirer'
import { rollback } from '@firelayer/core/lib/firebase/firestore'
import initAdmin from '../../helpers/initAdmin'

export default class MigrateRollback extends Command {
  static description = 'rollback migrations'

  static examples = ['$ firelayer migrate:rollback --steps 1']

  static flags = {
    help: flags.help({ char: 'h' }),
    yes: flags.boolean({ char: 'y', description: 'skip interactive session' }),
    steps: flags.integer({ char: 's', description: 'rollback the last x steps', default: 1 })
  }

  async run() {
    const { flags } = this.parse(MigrateRollback)

    let continueRollback = flags.yes

    if (!flags.yes) {
      const quiz = await prompt({
        type: 'confirm',
        name: 'confirm',
        message: `Rollback the previous ${flags.steps} migration(s) (env: '${chalk.bold.cyan(this.env)}') ?`
      })

      continueRollback = quiz.confirm
    }

    if (continueRollback) {
      this.log(chalk.bold('\nInitializing rollback..\n'))
      initAdmin()

      await rollback(path.join(this.root, 'database/migrations'), { steps: flags.steps })
    }

    return
  }
}
