import { Command } from '@oclif/command'
import { db, realtime, timestamp, serverTimestamp } from '@firelayer/core/lib/firebase'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as chalk from 'chalk'
import findRoot from '../utils/findRoot'
import initAdmin from '../helpers/initAdmin'
import cmd from '../utils/cmd'

const context = { db, realtime, timestamp, serverTimestamp }

export default class Db extends Command {
  static description = 'database helpers'

  static examples = ['$ firelayer db seed']

  static args = [{ name: 'action' }]

  async run() {
    const { args } = this.parse(Db)
    const root = await findRoot()

    process.chdir(root)

    const { action } = args

    if (action === 'seed') {
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
