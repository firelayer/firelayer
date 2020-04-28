import * as chalk from 'chalk'
import { prompt } from 'inquirer'
import { getAppConfig } from 'firebase-tools/lib/management/apps'
import * as firebaseCLI from 'firebase-tools'
import fireWrap from './fireWrap'

export default async (): Promise<any> => {
  const projects = await fireWrap(firebaseCLI.projects.list)

  if (projects.length === 0) {
    console.log(chalk.bold('\nNo Firebase projects found.\n'))

    console.log(`A Firebase project is needed to continue. Please run ${chalk.bold.cyan('firebase project:create')} or`)
    console.log(`Go to the Firebase console ${chalk.bold.cyan('https://console.firebase.google.com')} and create a project there.\n`)

    return process.exit(1)
    // const quiz = await prompt({
    //   type: 'confirm',
    //   name: 'confirm',
    //   message: 'Do you want to create a Firebase project ?'
    // })

    // if (quiz.confirm) {
    //   const project = await firebaseCLI.projects.create(undefined, {})

    //   const webProjectName = await cli.prompt('What name do you want for the new web application? ')
    //   const webApp = await firebaseCLI.apps.create('WEB', webProjectName, { project: project.projectId })

    //   return await getAppConfig(webApp.appId, 'WEB')
    // } else {
    //   console.log(chalk.bold('\nA Firebase project is needed to continue.\n'))

    //   process.exit(1)
    // }
  } else {
    const projectquiz = await prompt([{
      type: 'list',
      name: 'projectId',
      message: 'What Firebase project would you like to use?',
      choices: projects.map((p) => ({ name: p.projectId }))
    }])

    const { projectId } = projectquiz

    const apps = await firebaseCLI.apps.list('WEB', { project: projectId })

    if (apps.length === 0) {
      console.log(chalk.bold('\nNo web applications found. Creating a new web application.\n'))
      const webProjectName = (await prompt({
        type: 'input',
        name: 'input',
        message: 'What name do you want for the new web application?'
      })).input
      const webApp = await firebaseCLI.apps.create('WEB', webProjectName, { project: projects[0].projectId })

      return await getAppConfig(webApp.appId, 'WEB')
    } else {
      const appquiz = await prompt([{
        type: 'list',
        name: 'appId',
        message: 'What web application would you like to use?',
        choices: apps.map((a) => ({ name: a.appId }))
      }])

      const { appId } = appquiz

      return await getAppConfig(appId, 'WEB')
    }
  }
}
