import * as path from 'path'
import * as fs from 'fs-extra'

export default env => {
  const appsEnv = {}
  /**
   * Get global app variables
   */
  const globalAppFile = `./config/app.${env}.json`
  const globalDefaultFile = './config/app.json'
  let globalConfig = {}

  if (fs.existsSync(globalAppFile)) {
    globalConfig = JSON.parse(fs.readFileSync(globalAppFile, 'utf8'))
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

  return appsEnv
}
