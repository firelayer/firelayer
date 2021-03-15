import Command from '../../base'
import { prompt } from 'inquirer'
import dbSeed from '../../helpers/dbSeed'

export default class DB extends Command {
  static description = 'database helper'

  static examples = ['$ firelayer db:seed']

  async run() {
    const { choice } = await prompt([{
      type: 'list',
      name: 'choice',
      message: 'What database action do you want?',
      choices: [{
        name: 'Seed',
      }],
    }])

    if (choice === 'Seed') await dbSeed()
  }
}
