import { Command } from '@oclif/command'
import { prompt } from 'inquirer'
import findRoot from '../../utils/findRoot'
import deployEnv from '../../helpers/deployEnv'
import deployCors from '../../helpers/deployCors'

export default class Deploy extends Command {
  static description = 'deploy helper'

  static examples = ['$ firelayer deploy:env']

  async run() {
    const root = await findRoot()

    process.chdir(root)

    const quiz = await prompt([{
      type: 'list',
      name: 'choice',
      message: 'What do you wish to deploy:',
      choices: [{
        name: 'Cloud Functions Environment Variables'
      }, {
        name: 'Storage CORS'
      }]
    }])

    const { choice } = quiz

    if (choice === 'Cloud Functions Environment Variables') await deployEnv()
    if (choice === 'Storage CORS') await deployCors()
  }
}
