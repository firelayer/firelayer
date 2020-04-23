import { Command, flags } from '@oclif/command'
import * as path from 'path'
import * as chalk from 'chalk'
import verifyPath from '../helpers/verifyPath'
import install from '../helpers/install'
import checkDependencies from '../utils/checkDependencies'

export default class Init extends Command {
  static description = 'create a new project'

  static examples = ['$ firelayer init new-firelayer-app']

  static flags = {
    help: flags.help({ char: 'h' }),
    skip: flags.boolean({ char: 's', description: 'skip install deps' })
  }

  static args = [{ name: 'name' }]

  async run() {
    await checkDependencies()

    const { args, flags } = this.parse(Init)
    const projectName = args.name || '.'
    const cwd = process.cwd()
    const inCurrent = projectName === '.'
    const targetDir = path.resolve(cwd, projectName || '.')
    const name = inCurrent ? path.relative('../', cwd) : projectName

    // verify installation path
    if (!(await verifyPath(projectName, targetDir))) return

    // install boilerplate
    try {
      const options = {
        skipDependencies: flags.skip
      }

      await install(targetDir, this.config.version, options)
    } catch (error) {
      this.log(chalk.bold.red('\nError: failed to get boilerplate.\n'))

      return
    }
  }
}
