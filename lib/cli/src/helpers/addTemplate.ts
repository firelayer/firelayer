/* eslint-disable no-await-in-loop */
import * as fs from 'fs-extra'
import * as path from 'path'
import * as os from 'os'
import * as chalk from 'chalk'
import * as glob from 'glob'
import * as deepmerge from 'deepmerge'
import * as Listr from 'listr'
import { prompt } from 'inquirer'
import findRoot from '../utils/findRoot'
import cmd from '../utils/cmd'
import cleanString from '../utils/cleanString'
import getDirectories from '../utils/getDirectories'
import logger from '../utils/logger'

async function getNameForApp(appName, currentApps) {
  appName = (await prompt({
    type: 'input',
    name: 'input',
    message: `Application name '${appName}' is already taken, please choose a different name:`
  })).input

  appName = cleanString(appName)

  if (currentApps[appName]) return getNameForApp(appName, currentApps)

  return appName
}

export default async (name = '', options = { silent: true, dependenciesPrompt: false }) => {
  const root = await findRoot()

  if (!name) {
    name = (await prompt({
      type: 'input',
      name: 'input',
      message: 'What\'s the name or git repository of the template ? (ex: starter)'
    })).input
  }

  const isGitRepo = name.indexOf('.git') !== -1
  let gitRepo = ''

  if (isGitRepo) {
    gitRepo = name
    name = cleanString(name
      .replace(/((?:.git)?#.*)/, '')
      .split('/')
      .slice(-1)[0]
      .replace(/[:#]/g, '')
      .replace('.git', ''))
  } else {
    gitRepo = `https://github.com/firelayer/${name}-template.git`
  }

  // choose latest tag version that suits cli version
  let stdout = ''

  try {
    stdout = (await cmd(`git ls-remote --tags ${gitRepo}`, {}, {
      'GIT_TERMINAL_PROMPT': '0'
    })) as string
  } catch (error) {
    const message = `Template not found. Repository: '${gitRepo}' not found.\n`

    logger('addTemplate', message)
    console.log(chalk.bold.red('\nError: ') + message)

    process.exit(1)
  }

  const versions = stdout.split(/\r?\n/).map((line) => {
    const match = line.match(/tags\/(.*)/)

    return match ? match[1] : ''
  })

  let latest = versions.length > 0 ? versions[versions.length - 1] : ''

  if (!latest) {
    if (!options.silent) {
      const message = `Can't find latest version for ${name}-template, using 'master' branch..`

      logger('addTemplate', message)
      console.log(chalk.bold(message))
    }

    latest = 'master'
  }

  if (!options.silent) console.log(chalk.bold(`\nGetting template from '${gitRepo}'..`))

  const tempPath = path.join(os.tmpdir(), 'firelayer-templates', name)

  // delete clone
  fs.removeSync(tempPath)

  await cmd(`git clone --branch ${latest} --depth 1 ${gitRepo} ${tempPath}`, {}, {
    'GIT_TERMINAL_PROMPT': '0'
  })

  // check if i already have a app with same dir name on my current project
  const newApps = {}
  const currentApps = {}

  getDirectories(`${tempPath}/apps`).forEach((app) => { app = path.basename(app); newApps[app] = app })
  getDirectories('./apps').forEach((app) => { app = path.basename(app); currentApps[app] = app })

  let overwritingFunctions = false

  for (const app in newApps) {
    if (currentApps[app]) {
      if (app === 'functions') {
        const quiz = await prompt({
          type: 'confirm',
          name: 'confirm',
          default: false,
          message: 'You can only have one \'functions\' app, do you want to overwrite the current one ?'
        })

        overwritingFunctions = quiz.confirm

        if (!overwritingFunctions) delete newApps['functions']
      } else {
        const newName = `app-${name}`

        if (currentApps[newName]) {
          const appName = await getNameForApp(newName, currentApps)

          newApps[app] = appName
        } else {
          newApps[app] = newName
        }
      }
    }
  }

  const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

  // copy new apps into current project
  for (const app in newApps) {
    const appName = newApps[app]

    // copy new app
    fs.ensureDirSync('./apps')
    fs.copySync(`${tempPath}/apps/${app}`, `./apps/${appName}`, { overwrite: true })

    // copy/create configs for that app
    fs.ensureDirSync(`./config/${appName}`)
    fs.copySync(`${tempPath}/config/${app}/env.dist.json`, `./config/${appName}/env.dist.json`, { overwrite: true })
    fs.copySync(`${tempPath}/config/${app}/env.dist.json`, `./config/${appName}/env.json`, { overwrite: true })

    if (!packageJSON.scripts[`dev:${appName}`]) packageJSON.scripts[`dev:${appName}`] = `firelayer run "cd apps/${appName} && npm run dev"`
    if (!packageJSON.scripts[`build:${appName}`]) packageJSON.scripts[`build:${appName}`] = `firelayer run "cd apps/${appName} && npm run build"`

    if (appName === 'functions') {
      if (!packageJSON.scripts['deploy:functions']) packageJSON.scripts['deploy:functions'] = 'npm run build:functions && firebase deploy --only functions'
    } else {
      if (!packageJSON.scripts[`deploy:${appName}`]) packageJSON.scripts[`deploy:${appName}`] = `npm run build:${appName} && firebase deploy --only hosting:${appName}`
    }

    const scripts = {}

    Object.keys(packageJSON.scripts)
      .sort()
      .forEach((v) => {
        scripts[v] = packageJSON.scripts[v]
      })

    packageJSON.scripts = scripts
  }

  fs.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2))

  // merge app.dist.json with template one
  if (fs.existsSync(`${tempPath}/config/app.dist.json`)) {
    if (fs.existsSync('./config/app.dist.json')) {
      const currentJSON = JSON.parse(fs.readFileSync('./config/app.dist.json', 'utf8'))
      const newJSON = JSON.parse(fs.readFileSync(`${tempPath}/config/app.dist.json`, 'utf8'))

      const merged = deepmerge(newJSON, currentJSON)

      fs.writeFileSync('./config/app.dist.json', JSON.stringify(merged, null, 2))
    } else {
      fs.copySync(`${tempPath}/config/app.dist.json`, './config/app.dist.json')
    }
  }

  const newTargets = []

  // merge firebase.json
  if (fs.existsSync(`${tempPath}/firebase.json`)) {
    if (fs.existsSync('./firebase.json')) {
      const currentJSON = JSON.parse(fs.readFileSync('./firebase.json', 'utf8'))
      const newJSON = JSON.parse(fs.readFileSync(`${tempPath}/firebase.json`, 'utf8'))

      // add functions
      if (newApps['functions']) {
        currentJSON.functions = newJSON.functions
      }

      // assign new app names to hosting on newJSON
      const newHostings = newJSON.hosting

      if (newHostings && newHostings.length > 0) {
        newHostings.map((hosting) => {
          try {
            const appName = hosting.public.match(/[/](\w+)/i)[0].replace('/', '')

            if (newApps[appName]) {
              hosting.public = hosting.public.replace(appName, newApps[appName])
            }
          } catch (error) {
            logger('addTemplate', error)
          }

          newTargets.push(hosting.target)

          return hosting
        })

        const currentHostings = currentJSON.hosting

        if (currentHostings && currentHostings.length > 0) {
          // check if hosting target already exists
          currentHostings.forEach((hosting) => {
            let exists = -1

            newHostings.forEach((newHosting, index) => {
              if (JSON.stringify(hosting) === JSON.stringify(newHosting)) exists = index
            })

            if (exists >= 0) newHostings.splice(exists, 1)
          })

          currentJSON.hosting = currentHostings.concat(newHostings)
        } else (
          currentJSON.hosting = newHostings
        )
      }

      fs.writeFileSync('./firebase.json', JSON.stringify(currentJSON, null, 2))
    } else {
      fs.copySync(`${tempPath}/firebase.json`, './firebase.json')
    }
  }

  // merge .firebaserc
  if (newTargets.length > 0) {
    if (fs.existsSync('./.firebaserc')) {
      const currentJSON = JSON.parse(fs.readFileSync('./.firebaserc', 'utf8'))
      const defaultName = currentJSON.projects.default

      const newDefaultHostingTargets = {
        targets: {}
      }

      newDefaultHostingTargets.targets[defaultName] = { hosting: {} }

      newTargets.forEach((target) => {
        newDefaultHostingTargets.targets[defaultName].hosting[target] = [defaultName]
      })

      const newFirebaseRC = deepmerge(currentJSON, newDefaultHostingTargets, {
        arrayMerge: (destinationArray, sourceArray, options) => sourceArray
      })

      fs.writeFileSync('./.firebaserc', JSON.stringify(newFirebaseRC, null, 2))
    }
  }

  // copy migrations
  fs.ensureDirSync('./database/migrations')

  glob.sync(`${tempPath}/database/migrations/*`).forEach((file) => {
    fs.copyFileSync(file, path.join('./database/migrations', path.basename(file)))
  })

  // copy rules
  if (fs.existsSync(`${tempPath}/rules`)) {
    if (fs.existsSync('./rules')) {
      const { confirm } = await prompt({
        type: 'confirm',
        name: 'confirm',
        default: false,
        message: 'Do you want to overwrite current rules ? \n (if not, a folder inside rules \'TO_MERGE\' will be made for manual merge)'
      })

      if (confirm) {
        fs.copySync(`${tempPath}/rules`, './rules')
      } else {
        fs.copySync(`${tempPath}/rules`, './rules/TO_MERGE')
      }
    } else {
      fs.copySync(`${tempPath}/rules`, './rules')
    }
  }

  // get firelayer.js
  let templateFn = () => {}

  if (fs.existsSync(`${tempPath}/firelayer.js`)) {
    try {
      templateFn = require(`${tempPath}/firelayer.js`)
    } catch (error) {
      logger('addTemplate', error)
    }
  }

  // delete clone
  fs.removeSync(tempPath)

  if (!options.silent) console.log(`\nAdded template ${chalk.cyan(name)}.\n`)

  if (options.dependenciesPrompt) {
    try {
      const { confirm } = await prompt({
        type: 'confirm',
        name: 'confirm',
        default: true,
        message: 'Install dependencies?'
      })

      const tasksDependencies = new Listr([{
        title: 'Installing dependencies',
        skip: () => !confirm,
        task: () => cmd('npm run bootstrap')
      }])

      await tasksDependencies.run()
    } catch (e) {
      logger('addTemplate', e)
      throw new Error(e)
    }
  }

  if (!options.silent) console.log(chalk.bold.cyan('\nDon\'t forget to verify hosting properties in \'firebase.json\' and targets on \'.firebaserc\'\n'))

  return templateFn
}
