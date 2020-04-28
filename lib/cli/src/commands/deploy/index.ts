import Command from '../../base'
import { prompt } from 'inquirer'
import deployEnv from '../../helpers/deployEnv'
import deployCors from '../../helpers/deployCors'

export default class Deploy extends Command {
  static description = 'deploy helper'

  static examples = ['$ firelayer deploy:env']

  async run() {
    const { choice } = await prompt([{
      type: 'list',
      name: 'choice',
      message: 'What do you wish to deploy:',
      choices: [{
        name: 'Cloud Functions Environment Variables'
      }, {
        name: 'Storage CORS'
      }]
    }])

    if (choice === 'Cloud Functions Environment Variables') await deployEnv()
    if (choice === 'Storage CORS') await deployCors()
  }
}
