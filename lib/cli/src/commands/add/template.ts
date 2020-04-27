import Command from '../../base'
import cli from 'cli-ux'
import addTemplate from '../../helpers/addTemplate'

export default class AddTemplate extends Command {
  static description = 'add templates to the current project'

  static examples = ['$ firelayer add:template starter']

  static args = [{ name: 'name' }]

  async run() {
    const { args } = this.parse(AddTemplate)
    const { name } = args

    await addTemplate(name, { silent: false })
  }
}
