import { Command } from '@oclif/command'
import { generateFilename } from '@firelayer/core/lib/firebase/firestore'
import * as fs from 'fs-extra'
import * as chalk from 'chalk'
import findRoot from '../utils/findRoot'

export default class Migrate extends Command {
  static description = 'helper to make new migrations'

  static examples = ['$ firelayer make migration create_posts_collection']

  static args = [{ name: 'action' }, { name: 'name' }]

  async run() {
    const { args } = this.parse(Migrate)
    const root = await findRoot()

    process.chdir(root)

    const { action, name } = args

    if (action === 'migration') {
      const filename = generateFilename(name || 'migration')

      fs.writeFileSync(`./database/migrations/${filename}.js`, `module.exports = {
  up: async ({ db }) => {},
  down: async ({ db }) => {}
}`)

      this.log(chalk.bold(`\nMigration created: database/migrations/${filename}.js\n`))
    }

    return
  }
}
