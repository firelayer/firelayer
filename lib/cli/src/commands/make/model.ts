import { Command } from '@oclif/command'
import findRoot from '../../utils/findRoot'
import makeModel from '../../helpers/makeModel'

export default class Make extends Command {
  static description = 'maker model helper'

  static examples = ['$ firelayer make:model create_posts']

  static args = [{ name: 'name', required: true }]

  async run() {
    const { args } = this.parse(Make)
    const root = await findRoot()

    process.chdir(root)

    const { name } = args

    await makeModel(name)
  }
}
