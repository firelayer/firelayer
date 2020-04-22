import { flags } from '@oclif/command'
import Command from '../base'
import { startMaintenance, isInMaintenance } from '@firelayer/core/lib/firebase'
import { prompt } from 'inquirer'
import * as chalk from 'chalk'
import initAdmin from '../helpers/initAdmin'

export default class Down extends Command {
  static description = 'put the application into maintenance mode'

  static examples = ['$ firelayer down']

  static flags = {
    help: flags.help({ char: 'h' }),
    yes: flags.boolean({ char: 'y', description: 'skip interactive session' })
  }

  async run() {
    const { flags } = this.parse(Down)

    let putInMaintenance = flags.yes

    if (!flags.yes) {
      const quiz = await prompt({
        type: 'confirm',
        name: 'confirm',
        message: `Put the application into maintenance for environment '${chalk.bold.cyan(this.env)}' ?`
      })

      putInMaintenance = quiz.confirm
    }

    if (putInMaintenance) {
      initAdmin()

      if (await isInMaintenance()) {
        this.log(chalk.yellow(`\nApplication is already in maintenance mode (env: ${chalk.bold(this.env)}).\n`))
        process.exit(0)
      } else {
        this.log(`\nPutting the application into maintenance mode! (env: ${chalk.bold(this.env)}).`)

        await startMaintenance()

        this.log(chalk.green(`\nApplication is now in maintenance mode (env: ${chalk.bold(this.env)}).\n`))
        process.exit(0)
      }
    }

    return
  }
}
