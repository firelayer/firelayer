import { generateFilename } from '@firelayer/core/lib/firebase/firestore'
import { prompt } from 'inquirer'
import * as fs from 'fs-extra'
import * as chalk from 'chalk'

export default async (name?) => {
  if (!name) {
    name = (await prompt({
      type: 'input',
      name: 'input',
      message: 'What is the migration name? (ex: create_posts)'
    })).input
  }

  const filename = generateFilename(name || 'migration')

  fs.mkdirSync('./database/migrations', { recursive: true })
  fs.writeFileSync(`./database/migrations/${filename}.js`,
    `module.exports = {
  up: async ({ db, realtime, timestamp, serverTimestamp }) => {},
  down: async ({ db, realtime, timestamp, serverTimestamp }) => {}
}`)

  console.log(chalk.bold(`\nMigration created: database/migrations/${filename}.js\n`))

  return
}
