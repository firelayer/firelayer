import Command from '../../base'
import { prompt } from 'inquirer'
import addTemplate from '../../helpers/addTemplate'

export default class Add extends Command {
  static description = 'add templates and plugins to the current project'

  static examples = ['$ firelayer add:template starter']

  async run() {
    const { choice } = await prompt([{
      type: 'list',
      name: 'choice',
      message: 'What would you wish to add?',
      choices: [{
        name: 'Template',
      }],
    }])

    if (choice === 'Template') await addTemplate(null, { silent: false, dependenciesPrompt: true })
  }
}
