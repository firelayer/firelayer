import Command from '../../base'
import { flags } from '@oclif/command'
import { User } from '@firelayer/core'
import * as chalk from 'chalk'
import initAdmin from '../../helpers/initAdmin'
import logger from '../../utils/logger'

export default class AuthAdd extends Command {
  static description = 'users and authentication'

  static examples = ['$ firelayer auth:add -u johndoe@doejohn.doe -p password123']

  static flags = {
    help: flags.help({ char: 'h' }),
    email: flags.string({ char: 'u', description: 'user email', required: true }),
    password: flags.string({ char: 'p', description: 'user password', required: true })
  }

  async run() {
    const { flags } = this.parse(AuthAdd)
    const { email, password } = flags

    if (password.length < 6) {
      this.log(chalk.red('Error') + ' The password must be a string with at least 6 characters.\n')

      process.exit(0)
    }

    initAdmin()

    const user = new User()

    try {
      console.log(await user.create({
        email,
        password
      }))
    } catch (error) {
      logger('auth', error)
      this.log(chalk.red('Failed to create user. ') + error.message + '.\n')
    }

    process.exit(0)
  }
}
