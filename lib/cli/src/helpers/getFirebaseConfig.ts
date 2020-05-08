import * as chalk from 'chalk'
import { prompt } from 'inquirer'
import { getAppConfig } from 'firebase-tools/lib/management/apps'
import * as firebaseCLI from 'firebase-tools'
import fireWrap from './fireWrap'
import logger from '../utils/logger'

export default async (): Promise<any> => {
  const projects = await fireWrap(firebaseCLI.projects.list)

  let projectId = null

  if (projects.length === 0) {
    console.log(chalk.bold('\nNo Firebase projects found.\n'))

    const { confirm } = await prompt({
      type: 'confirm',
      name: 'confirm',
      message: 'Do you want to create a Firebase project ?'
    })

    if (confirm) {
      const project = await createProject()

      projectId = project.projectId
    } else {
      console.log(chalk.bold('\nA Firebase project is needed to continue.\n'))

      process.exit(1)
    }
  } else {
    // select or create a new one
    const { choice } = await prompt([{
      type: 'list',
      name: 'choice',
      message: 'Do you wish to create a new Firebase project or select an existing one?',
      choices: [{
        name: 'Select an existing Firebase project',
        value: 1
      }, {
        name: 'Create a new Firebase project',
        value: 2
      }]
    }])

    if (choice === 2) {
      const project = await createProject()

      projectId = project.projectId
    } else {
      projectId = (await prompt([{
        type: 'list',
        name: 'projectId',
        message: 'What Firebase project would you like to use?',
        choices: projects.map((p) => ({ name: `${p.projectId} (${p.displayName})`, value: p.projectId }))
      }])).projectId
    }
  }

  console.log(`\nNow we only need to select a Firebase Web Application inside the project ${chalk.bold.cyan(projectId)}\n`)

  const apps = await firebaseCLI.apps.list('WEB', { project: projectId })

  if (apps.length === 0) {
    console.log(chalk.bold('\nNo web applications found. Creating a new web application.\n'))

    const webApp = await createWebApp(projectId)

    return await getAppConfig(webApp.appId, 'WEB')
  } else {
    // select or create a new one
    const { choice } = await prompt([{
      type: 'list',
      name: 'choice',
      message: 'Do you wish to create a new Firebase Web Application or select an existing one?',
      choices: [{
        name: 'Select an existing Firebase Web Application',
        value: 1
      }, {
        name: 'Create a new Firebase Web Application',
        value: 2
      }]
    }])

    let appId = null

    if (choice === 2) {
      const webApp = await createWebApp(projectId)

      return await getAppConfig(webApp.appId, 'WEB')
    } else {
      appId = (await prompt([{
        type: 'list',
        name: 'appId',
        message: 'What web application would you like to use?',
        choices: apps.map((a) => ({ name: `${a.appId} (${a.displayName})`, value: a.appId }))
      }])).appId
    }

    return await getAppConfig(appId, 'WEB')
  }
}

async function createProject(exists?) {
  try {
    if (exists) console.log(chalk.bold.yellow('\nSelected Firebase Project Id already exists, please specify another one.\n'))

    console.log(chalk.yellow(`\nUnique id must be without spaces, special characters and lower case. (example: '${chalk.bold('my-firelayer-poney')}' )\n`))

    const project = await firebaseCLI.projects.create(undefined, {})

    return project
  } catch (e) {
    logger('getFirebaseConfig', e)

    return createProject(true)
  }
}

async function createWebApp(projectId) {
  const webProjectName = (await prompt({
    type: 'input',
    name: 'input',
    message: 'What name do you want for the new web application?'
  })).input

  return await firebaseCLI.apps.create('WEB', webProjectName, { project: projectId })
}
