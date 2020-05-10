import Command from '../../base'
import makeMigration from '../../helpers/makeMigration'

export default class MakeMigration extends Command {
  static description = 'maker migration helper'

  static examples = ['$ firelayer make:migration create_posts']

  static args = [{ name: 'name', required: true }]

  async run() {
    const { args } = this.parse(MakeMigration)
    const { name } = args

    await makeMigration(name)
  }
}
