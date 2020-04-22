import { Command } from '@oclif/command'
import { prompt } from 'inquirer'
import findRoot from '../../utils/findRoot'
import dbSeed from '../../helpers/dbSeed'

export default class DB extends Command {
  static description = 'database helper'

  static examples = ['$ firelayer db:seed']

  async run() {
    const root = await findRoot()

    process.chdir(root)

    const quiz = await prompt([{
      type: 'list',
      name: 'choice',
      message: 'What database action do you want?',
      choices: [{
        name: 'Seed'
      }]
    }])

    const { choice } = quiz

    if (choice === 'Seed') await dbSeed()
  }
}
