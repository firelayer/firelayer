import { Command, flags } from '@oclif/command'
import { admin } from '@firelayer/core/lib/firebase'
import { User } from '@firelayer/core/lib/firebase/user'
import * as path from 'path'
import * as chalk from 'chalk'
import * as fs from 'fs-extra'

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

    if (flags.user) {
      const env = fs.readFileSync('./.firelayer/env', 'utf8')
      const credentials = JSON.parse(fs.readFileSync(`./environments/${env}.key.json`, 'utf8'))

      admin.initializeApp({
        credential: admin.credential.cert(credentials)
      })

      const user = new User(flags.user)

      if (flags['set-admin']) {
        await user.setAdmin(true)
      }
    }
  }
}
