import Command from '../../base'
import deployCors from '../../helpers/deployCors'
import logger from '../../utils/logger'
import * as chalk from 'chalk'

export default class DeployCors extends Command {
  static description = 'deploy storage cors configuration'

  static examples = ['$ firelayer deploy:cors']

  async run() {
    try {
      await deployCors()
    } catch (error) {
      logger('deploy cors', error)
      this.log(chalk.bold.red('Error: ') + 'on deploying storage cors.')
    }

    return
  }
}
