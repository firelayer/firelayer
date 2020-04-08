import { Command, flags } from '@oclif/command'
import { admin } from '@firelayer/core/lib/firebase'
import { User } from '@firelayer/core/lib/firebase/user'
import findRoot from '../utils/findRoot'
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
    const root = await findRoot()

    process.chdir(root)

    let env = 'default'

    if (flags.user) {
      if (!fs.existsSync(path.join(root, '.firelayer/env'))) {
        this.log(`\nCreating '${chalk.bold('.firelayer/env')}' missing file..`)

        fs.mkdirSync('.firelayer', { recursive: true })
        fs.writeFileSync('.firelayer/env', 'default')
      } else {
        env = fs.readFileSync('./.firelayer/env', 'utf8')
      }

      const envFile = `./configs/keys/${env}.key.json`
      const defaultFile = './configs/keys/key.json'
      let credentials = {}

      try {
        let envContent = undefined

        if (fs.existsSync(envFile)) {
          envContent = fs.readFileSync(envFile, 'utf8')
        } else if (env === 'default' && fs.existsSync(defaultFile)) {
          envContent = fs.readFileSync(defaultFile, 'utf8')
        }

        credentials = JSON.parse(envContent)

      } catch (error) {
        const notFound = env === 'default' ? `key.json or ${env}.key.json` : `${env}.key.json`

        this.log(chalk.red(`Failed to get credentials from 'config/keys' > '${chalk.bold(notFound)}'..\n`))

        return
      }

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
