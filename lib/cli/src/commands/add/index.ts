import Command from '../../base'
import { prompt } from 'inquirer'
import cli from 'cli-ux'
import addTemplate from '../../helpers/addTemplate'

export default class Add extends Command {
  static description = 'add templates and plugins to the current project'

  static examples = ['$ firelayer add:template starter']

  async run() {
    const quiz = await prompt([{
      type: 'list',
      name: 'choice',
      message: 'What would you wish to add?',
      choices: [{
        name: 'Template'
      }]
    }])

    const { choice } = quiz

    if (choice === 'Template') await addTemplate(null, { silent: false })
  }
}
