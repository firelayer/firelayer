import Command from '../../base'
import makeModel from '../../helpers/makeModel'

export default class MakeModel extends Command {
  static description = 'maker model helper'

  static examples = ['$ firelayer make:model create_posts']

  static args = [{ name: 'name', required: true }]

  async run() {
    const { args } = this.parse(MakeModel)
    const { name } = args

    await makeModel(name)
  }
}
