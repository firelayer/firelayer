import { Command, flags } from '@oclif/command'
import { db, realtime, timestamp, serverTimestamp } from '@firelayer/core/lib/firebase'
import { prompt } from 'inquirer'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as chalk from 'chalk'
import findRoot from '../utils/findRoot'
import initAdmin from '../helpers/initAdmin'
import getEnv from '../helpers/getEnv'
import cmd from '../utils/cmd'

const context = { db, realtime, timestamp, serverTimestamp }

export default class Db extends Command {
  static description = 'database helpers'

  static examples = ['$ firelayer db seed']

  static args = [{ name: 'action' }]

  static flags = {
    help: flags.help({ char: 'h' }),
    yes: flags.boolean({ char: 'y', description: 'skip interactive session' })
  }

  async run() {
    const { args, flags } = this.parse(Db)
    const root = await findRoot()

    process.chdir(root)

    const { action } = args
    const env = getEnv()

    if (action === 'seed') {
      let continueSeeding = flags.yes

      if (!flags.yes) {
        const quiz = await prompt({
          type: 'confirm',
          name: 'confirm',
          message: `Seed database for the environment '${chalk.bold.cyan(env)}' ?`
        })

        continueSeeding = quiz.confirm
      }

      if (continueSeeding) {
        initAdmin()

        if (fs.existsSync('./database/seeds/firestore.js')) {
          this.log(chalk.bold('\nInitializing firestore seeding..\n'))

          const seeder = require(path.join(root, './database/seeds/firestore.js'))

          console.time('Finished firestore seeding')
          await seeder.seed(context)
          console.timeEnd('Finished firestore seeding')
        }

        if (fs.existsSync('./database/seeds/realtime.js')) {
          this.log(chalk.bold('\nInitializing realtime database seeding..\n'))

          const seeder = require(path.join(root, './database/seeds/realtime.js'))

          console.time('Finished realtime seeding')
          await seeder.seed(context)
          console.timeEnd('Finished realtime seeding')
        }

        if (fs.existsSync('./database/seeds/users.json')) {
          this.log(chalk.bold('\nInitializing users seeding..\n'))

          console.time('Finished users seeding')
          await cmd('firebase auth:import ./database/seeds/users.json')
          console.timeEnd('Finished users seeding')
        }

        this.log()

        return
      }
    }
  }
}
