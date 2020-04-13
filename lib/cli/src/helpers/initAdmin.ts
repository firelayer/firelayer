import * as chalk from 'chalk'
import * as fs from 'fs-extra'
import { admin } from '@firelayer/core/lib/firebase'
import getEnv from '../helpers/getEnv'

export default () => {
  const env = getEnv()

  const envFile = `./config/keys/${env}.key.json`
  const defaultFile = './config/keys/key.json'
  const globalAppFile = `./config/app.${env}.json`
  const globalDefaultFile = './config/app.json'
  let globalConfig: any = {}

  if (fs.existsSync(globalAppFile)) {
    globalConfig = JSON.parse(fs.readFileSync(globalAppFile, 'utf8'))
  } else if (env === 'default' && fs.existsSync(globalDefaultFile)) {
    globalConfig = JSON.parse(fs.readFileSync(globalDefaultFile, 'utf8'))
  }

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
    credential: admin.credential.cert(credentials),
    databaseURL: globalConfig.firebase.databaseURL,
    storageBucket: globalConfig.firebase.storageBucket
  })
}