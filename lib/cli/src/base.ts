import Command from '@oclif/command'
import findRoot from './utils/findRoot'
import getEnv from './helpers/getEnv'

export default abstract class extends Command {
  root: string
  cwd: string
  env: string

  async init() {
    const root = await findRoot()
    const cwd = process.cwd()

    process.chdir(root)

    const env = getEnv()

    this.root = root
    this.cwd = cwd
    this.env = env
  }
}
