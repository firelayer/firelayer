import * as chalk from 'chalk'
import * as Listr from 'listr'
import { prompt } from 'inquirer'
import getEnv from '../helpers/getEnv'
import getEnvVariables from '../helpers/getEnvVariables'
import cmd from '../utils/cmd'

export default async () => {
  const envName = getEnv()

  const quiz = await prompt({
    type: 'confirm',
    name: 'confirm',
    message: `Deploy cloud functions environment variables for '${chalk.bold.cyan(envName)}' ?`
  })

  if (quiz.confirm) {
    let envVars: any = {}

    const tasks = new Listr([{
      title: 'Get environment variables',
      task: () => {
        envVars = getEnvVariables(envName)
      }
    }, {
      title: `Removing previous environment variables from environment (env: ${chalk.bold(envName)}).`,
      task: () => cmd('firebase functions:config:unset env')
    }, {
      title: `Deploying new environment variables (env: ${chalk.bold(envName)}).`,
      task: () => cmd(`firebase functions:config:set env='${envVars.functions}'`)
    }])

    try {
      await tasks.run()
    } catch (e) {
      throw new Error()
    }

    console.log(`\n🎉  Successfully deployed variables, ${chalk.bold('deploy your functions for the change to take effect')}.\n`)
  }
}
