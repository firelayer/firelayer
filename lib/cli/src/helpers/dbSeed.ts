import { db, realtime, timestamp, serverTimestamp } from '@firelayer/core/lib/firebase'
import { prompt } from 'inquirer'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as chalk from 'chalk'
import * as firebaseCLI from 'firebase-tools'
import initAdmin from '../helpers/initAdmin'
import getEnv from '../helpers/getEnv'
import findRoot from '../utils/findRoot'
import fireWrap from '../helpers/fireWrap'

const context = { db, realtime, timestamp, serverTimestamp }

export default async () => {
  const root = await findRoot()
  const env = getEnv()

  const { confirm } = await prompt({
    type: 'confirm',
    name: 'confirm',
    message: `Seed database for the environment '${chalk.bold.cyan(env)}' ?`
  })

  if (confirm) {
    initAdmin()

    if (fs.existsSync('./database/seeds/firestore.js')) {
      console.log(chalk.bold('\nInitializing firestore seeding..\n'))

      const seeder = require(path.join(root, './database/seeds/firestore.js'))

      console.time('Finished firestore seeding')
      await seeder.seed(context)
      console.timeEnd('Finished firestore seeding')
    }

    if (fs.existsSync('./database/seeds/realtime.js')) {
      console.log(chalk.bold('\nInitializing realtime database seeding..\n'))

      const seeder = require(path.join(root, './database/seeds/realtime.js'))

      console.time('Finished realtime seeding')
      await seeder.seed(context)
      console.timeEnd('Finished realtime seeding')
    }

    if (fs.existsSync('./database/seeds/users.json')) {
      console.log(chalk.bold('\nInitializing users seeding..\n'))

      console.time('Finished users seeding')
      await fireWrap(() => firebaseCLI.auth.import('./database/seeds/users.json', {}))
      console.timeEnd('Finished users seeding')
    }

    console.log()

    return
  }
}
