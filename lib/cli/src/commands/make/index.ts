import Command from '../../base'
import { prompt } from 'inquirer'
import makeModel from '../../helpers/makeModel'
import makeMigration from '../../helpers/makeMigration'

export default class Make extends Command {
  static description = 'maker helper'

  static examples = [`
  $ firelayer make:migration create_posts_collection
  $ firelayer make:model Post
  `]

  async run() {
    const quiz = await prompt([{
      type: 'list',
      name: 'make',
      message: 'What do you wish to generate:',
      choices: [{
        name: 'Model'
      }, {
        name: 'Migration'
      }]
    }])

    const { make } = quiz

    if (make === 'Model') await makeModel()
    if (make === 'Migration') await makeMigration()
  }
}
