import { Command } from '@oclif/command'
import findRoot from '../../utils/findRoot'
import deployCors from '../../helpers/deployCors'

export default class Deploy extends Command {
  static description = 'deploy storage cors configuration'

  static examples = ['$ firelayer deploy:cors']

  async run() {
    const root = await findRoot()

    process.chdir(root)

    await deployCors()

    return
  }
}
