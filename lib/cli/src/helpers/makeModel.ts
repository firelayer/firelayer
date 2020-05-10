import { JavascriptModel, TypescriptModel } from '@firelayer/core/lib/firebase/firestore'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as chalk from 'chalk'
import { prompt } from 'inquirer'
import getDirectories from '../utils/getDirectories'

export default async (name?) => {
  if (!name) {
    name = (await prompt({
      type: 'input',
      name: 'input',
      message: 'What is the model name? (ex: Post)'
    })).input
  }

  const model = name.charAt(0).toUpperCase() + name.slice(1)

  const applications = getDirectories('./apps').map((app) => path.basename(app))

  const choices = applications.map((app) => ({
    name: app
  }))

  console.log()

  const { apps, language } = await prompt([{
    type: 'checkbox',
    name: 'apps',
    message: 'Select which applications to create the model:',
    choices
  }])

  // , {
  //   type: 'list',
  //   name: 'language',
  //   message: 'Choose the language for the model:',
  //   choices: [{
  //     name: 'Javascript'
  //   }, {
  //     name: 'Typescript'
  //   }]
  // }])

  if (apps.length === 0) return

  apps.forEach((app) => {
    fs.mkdirSync(`./apps/${app}/src/models`, { recursive: true })

    fs.writeFileSync(`./apps/${app}/src/models/${model}.js`, TypescriptModel(model))

    console.log(chalk.bold(`Model created: apps/${app}/models/${model}.js\n`))

    // if (language === 'Javascript') {
    //   fs.writeFileSync(`./apps/${app}/src/models/${model}.js`, JavascriptModel(model))

    //   console.log(chalk.bold(`Model created: apps/${app}/models/${model}.js\n`))
    // } else if (language === 'Typescript') {
    //   fs.writeFileSync(`./apps/${app}/src/models/${model}.ts`, TypescriptModel(model))

    //   console.log(chalk.bold(`Model created: apps/${app}/models/${model}.js\n`))
    // }
  })

  return
}
