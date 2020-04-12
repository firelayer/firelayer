import { Command, flags } from '@oclif/command'
import { User } from '@firelayer/core/lib/firebase'
import * as chalk from 'chalk'
import findRoot from '../utils/findRoot'
import initAdmin from '../helpers/initAdmin'

export default class Auth extends Command {
  static description = 'users and authentication'

  static examples = ['$ firelayer auth -u johndoe@doejohn.doe --set-admin']

  static flags = {
    help: flags.help({ char: 'h' }),
    user: flags.string({ char: 'u', description: 'user uid, email or phone number' }),
    'set-admin': flags.boolean({ description: 'set user as admin' })
  }

  async run() {
    const { flags } = this.parse(Auth)
    const root = await findRoot()

    process.chdir(root)

    if (flags.user) {
      initAdmin()

      const user = new User(flags.user)

      if (Object.keys(flags).length === 1) {
        try {
          console.log(await user.get())
        } catch (error) {
          console.log(error.message)
          this.log(chalk.red('User not found\n'))
        }

        process.exit(0)
      }

      if (flags['set-admin']) {
        console.log(await user.setAdmin(true))
        process.exit(0)
      }
    }
  }
}
