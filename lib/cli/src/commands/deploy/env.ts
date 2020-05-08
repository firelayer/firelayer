import Command from '../../base'
import deployEnv from '../../helpers/deployEnv'
import logger from '../../utils/logger'
import * as chalk from 'chalk'

export default class DeployEnv extends Command {
  static description = 'deploy env variables'

  static examples = ['$ firelayer deploy:env']

  async run() {
    try {
      await deployEnv()
    } catch (error) {
      logger('deploy env', error)
      this.log(chalk.bold.red('Error: ') + 'on deploying environment variables.')
    }

    return
  }
}
