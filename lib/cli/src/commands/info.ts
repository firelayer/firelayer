import { Command } from '@oclif/command'
import * as chalk from 'chalk'

export default class Info extends Command {
  static description = 'print debugging information about your environment'

  static examples = ['$ firelayer info']

  async run() {
    this.log(chalk.bold('\nEnvironment Info:'))
    this.log(await require('envinfo').run({
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'Yarn', 'npm'],
      Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
      npmPackages: '/**/{typescript,*firelayer*,@firelayer/*/}',
      npmGlobalPackages: ['@firelayer/cli', 'firelayer']
    }, {
      showNotFound: true,
      duplicates: true,
      fullTree: true
    }))
  }
}
