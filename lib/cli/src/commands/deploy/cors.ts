import Command from '../../base'
import deployCors from '../../helpers/deployCors'

export default class Deploy extends Command {
  static description = 'deploy storage cors configuration'

  static examples = ['$ firelayer deploy:cors']

  async run() {
    await deployCors()

    return
  }
}
