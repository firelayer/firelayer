import { Command } from '@oclif/command'
import deployEnv from '../../helpers/deployEnv'
import findRoot from '../../utils/findRoot'

export default class Deploy extends Command {
  static description = 'deploy env variables'

  static examples = ['$ firelayer deploy:env']

  async run() {
    const root = await findRoot()

    process.chdir(root)

    await deployEnv()

    return
  }
}
