import Command from '../../base'
import { prompt } from 'inquirer'
import deployEnv from '../../helpers/deployEnv'
import deployCors from '../../helpers/deployCors'
import logger from '../../utils/logger'
import * as chalk from 'chalk'

export default class Deploy extends Command {
  static description = 'deploy helper'

  static examples = ['$ firelayer deploy:env']

  async run() {
    const { choice } = await prompt([{
      type: 'list',
      name: 'choice',
      message: 'What do you wish to deploy:',
      choices: [{
        name: 'Cloud Functions Environment Variables',
      }, {
        name: 'Storage CORS',
      }],
    }])

    if (choice === 'Cloud Functions Environment Variables') {
      try {
        await deployEnv()
      } catch (error) {
        logger('deploy env', error)
        this.log(chalk.bold.red('Error: ') + 'on deploying environment variables.')
      }
    } else if (choice === 'Storage CORS') {
      try {
        await deployCors()
      } catch (error) {
        logger('deploy cors', error)
        this.log(chalk.bold.red('Error: ') + 'on deploying storage cors.')
      }
    }
  }
}
