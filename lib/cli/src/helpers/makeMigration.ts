import { generateFilename } from '@firelayer/core/lib/firebase/firestore'
import * as fs from 'fs-extra'
import * as chalk from 'chalk'
import cli from 'cli-ux'

// eslint-disable-next-line arrow-parens
export default async (name?) => {
  if (!name) {
    name = await cli.prompt('What is the migration name? (ex: create_posts)')
  }

  const filename = generateFilename(name || 'migration')

  fs.mkdirSync('./database/migrations', { recursive: true })
  fs.writeFileSync(`./database/migrations/${filename}.js`,
    `module.exports = {
  up: async ({ db }) => {},
  down: async ({ db }) => {}
}`)

  console.log(chalk.bold(`\nMigration created: database/migrations/${filename}.js\n`))

  return
}
