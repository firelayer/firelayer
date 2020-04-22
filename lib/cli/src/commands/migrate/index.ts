import { Command, flags } from '@oclif/command'
import * as path from 'path'
import * as chalk from 'chalk'
import { prompt } from 'inquirer'
import { migrate } from '@firelayer/core/lib/firebase/firestore'
import findRoot from '../../utils/findRoot'
import initAdmin from '../../helpers/initAdmin'
import getEnv from '../../helpers/getEnv'

export default class Migrate extends Command {
  static description = 'run migrations'

  static examples = [`
  $ firelayer migrate
  $ firelayer migrate:rollback --steps 2
  `]

  static flags = {
    help: flags.help({ char: 'h' }),
    yes: flags.boolean({ char: 'y', description: 'skip interactive session' })
  }

  async run() {
    const { flags } = this.parse(Migrate)
    const root = await findRoot()

    process.chdir(root)

    const env = getEnv()

    let continueMigration = flags.yes

    if (!flags.yes) {
      const quiz = await prompt({
        type: 'confirm',
        name: 'confirm',
        message: `Run migrations for environment: '${chalk.bold.cyan(env)}' ?`
      })

      continueMigration = quiz.confirm
    }

    // run migrations
    if (continueMigration) {
      this.log(chalk.bold('\nInitializing migrations..\n'))
      initAdmin()

      await migrate(path.join(root, 'database/migrations'))
    }

    return
  }
}
