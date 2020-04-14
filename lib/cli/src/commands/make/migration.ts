import { Command } from '@oclif/command'
import findRoot from '../../utils/findRoot'
import makeMigration from '../../helpers/makeMigration'

export default class Make extends Command {
  static description = 'maker migration helper'

  static examples = ['$ firelayer make:migration create_posts']

  static args = [{ name: 'name', required: true }]

  async run() {
    const { args } = this.parse(Make)
    const root = await findRoot()

    process.chdir(root)

    const { name } = args

    await makeMigration(name)
  }
}
