import { Command, flags } from '@oclif/command'
import * as path from 'path'
import * as chalk from 'chalk'
import { prompt } from 'inquirer'
import { rollback } from '@firelayer/core/lib/firebase/firestore'
import findRoot from '../../utils/findRoot'
import initAdmin from '../../helpers/initAdmin'
import getEnv from '../../helpers/getEnv'

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
    const root = await findRoot()

    process.chdir(root)

    const env = getEnv()

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
