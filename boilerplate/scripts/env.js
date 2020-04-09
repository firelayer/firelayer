#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const currentEnvFile = '.firelayer/env'
const appsEnv = {}
let keyPath = ''

try {
  /**
   * Get current environment
   */
  let env = ''

  if (!fs.existsSync(currentEnvFile)) {
    console.log('\nEnvironment settings not found, setting env to \'default\'')
    console.log('\nTo select an environment please use \'firelayer use <env-name>\'\n')

    env = 'default'

    fs.mkdirSync('.firelayer', { recursive: true })
    fs.writeFileSync('.firelayer/env', env)
  } else {
    env = fs.readFileSync(currentEnvFile, 'utf8')
  }

  /**
   * Find current environment path to service key file
   */
  const keyFile = `./config/keys/${env}.key.json`
  const defaultKeyFile = './config/keys/key.json'

  if (fs.existsSync(keyFile)) {
    keyPath = path.resolve(keyFile)
  } else if (env === 'default' && fs.existsSync(defaultKeyFile)) {
    keyPath = path.resolve(defaultKeyFile)
  }

  if (!keyPath) {
    const notFound = env === 'default' ? `key.json or ${env}.key.json` : `${env}.key.json`

    console.log(`\nFailed to get credentials from 'config/keys' > '${notFound}'..\n`)

    process.exit(0)
  }

  /**
   * Get global app variables
   */
  const globalAppFile = `./config/app.${env}.json`
  const globalDefaultFile = './config/app.json'
  let globalConfig = {}

  if (fs.existsSync(globalAppFile)) {
    globalConfig = JSON.parse(fs.readFileSync(globalFile, 'utf8'))
  } else if (env === 'default' && fs.existsSync(globalDefaultFile)) {
    globalConfig = JSON.parse(fs.readFileSync(globalDefaultFile, 'utf8'))
  }

  /**
   * Get and set all applications config in env
   */
  const dirFilter = source => fs.lstatSync(source).isDirectory() && !(/keys$/.test(source))
  const getDirectories = source => fs.readdirSync(source).map(name => path.join(source, name)).filter(dirFilter)
  const applications = getDirectories('./config').map(app => {
    const name = app.substring(7)
    let config = {}

    const appEnvfile = `./${app}/env.${env}.json`
    const appDefaultFile = `./${app}/env.json`

    if (fs.existsSync(appEnvfile)) {
      config = JSON.parse(fs.readFileSync(appEnvfile, 'utf8'))
    } else if (env === 'default' && fs.existsSync(appDefaultFile)) {
      config = JSON.parse(fs.readFileSync(appDefaultFile, 'utf8'))
    }

    return {
      name,
      config: JSON.stringify({
        ...globalConfig,
        ...config
      })
    }
  })

  applications.forEach(app => {
    appsEnv[app.name] = app.config
  })

} catch (e) {
  console.log(e)
  console.log('\nFailed to load environment variables.\n')

  process.exit(0)
}

module.exports = {
  GOOGLE_APPLICATION_CREDENTIALS: keyPath,
  ...appsEnv
}
