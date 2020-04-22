import { JavascriptModel, TypescriptModel } from '@firelayer/core/lib/firebase/firestore'
import cli from 'cli-ux'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as chalk from 'chalk'
import { prompt } from 'inquirer'

export default async (name?) => {
  if (!name) {
    name = await cli.prompt('What is the model name? (ex: Post)')
  }

  const model = name.charAt(0).toUpperCase() + name.slice(1)

  const dirFilter = (source) => fs.lstatSync(source).isDirectory()
  const getDirectories = (source) => fs.readdirSync(source).map((name) => path.join(source, name)).filter(dirFilter)
  const applications = getDirectories('./app').map((a) => a.replace('app/', ''))

  const choices = applications.map((app) => ({
    name: app
  }))

  console.log()

  const quiz = await prompt([{
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

  const { apps, language } = quiz

  if (apps.length === 0) return

  apps.forEach((app) => {
    fs.mkdirSync(`./app/${app}/src/models`, { recursive: true })

    fs.writeFileSync(`./app/${app}/src/models/${model}.js`, TypescriptModel(model))

    console.log(chalk.bold(`Model created: app/${app}/models/${model}.js\n`))

    // if (language === 'Javascript') {
    //   fs.writeFileSync(`./app/${app}/src/models/${model}.js`, JavascriptModel(model))

    //   console.log(chalk.bold(`Model created: app/${app}/models/${model}.js\n`))
    // } else if (language === 'Typescript') {
    //   fs.writeFileSync(`./app/${app}/src/models/${model}.ts`, TypescriptModel(model))

    //   console.log(chalk.bold(`Model created: app/${app}/models/${model}.js\n`))
    // }
  })

  return
}
