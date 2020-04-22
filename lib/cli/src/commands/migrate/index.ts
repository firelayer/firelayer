import { flags } from '@oclif/command'
import Command from '../../base'
import * as path from 'path'
import * as chalk from 'chalk'
import { prompt } from 'inquirer'
import { migrate } from '@firelayer/core/lib/firebase/firestore'
import initAdmin from '../../helpers/initAdmin'

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

    let continueMigration = flags.yes

    if (!flags.yes) {
      const quiz = await prompt({
        type: 'confirm',
        name: 'confirm',
        message: `Run migrations for environment: '${chalk.bold.cyan(this.env)}' ?`
      })

      continueMigration = quiz.confirm
    }

    // run migrations
    if (continueMigration) {
      this.log(chalk.bold('\nInitializing migrations..\n'))
      initAdmin()

      await migrate(path.join(this.root, 'database/migrations'))
    }

    return
  }
}
