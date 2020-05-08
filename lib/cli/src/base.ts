import Command from '@oclif/command'
import * as chalk from 'chalk'
import findRoot from './utils/findRoot'
import getEnv from './helpers/getEnv'
import logger from './utils/logger'

export default abstract class extends Command {
  root: string
  cwd: string
  env: string

  async init() {
    try {
      const root = await findRoot()
      const cwd = process.cwd()

      process.chdir(root)

      const env = getEnv()

      this.root = root
      this.cwd = cwd
      this.env = env
    } catch (error) {
      this.log(`\n${chalk.bold.red('Error:')} ${error.message}\n`)
      logger('base', error)

      process.exit(1)
    }
  }
}
