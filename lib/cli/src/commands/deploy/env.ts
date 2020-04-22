import Command from '../../base'
import deployEnv from '../../helpers/deployEnv'

export default class Deploy extends Command {
  static description = 'deploy env variables'

  static examples = ['$ firelayer deploy:env']

  async run() {
    await deployEnv()

    return
  }
}
