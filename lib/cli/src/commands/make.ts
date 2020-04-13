import { Command } from '@oclif/command'
import { generateFilename, JavascriptModel, TypescriptModel } from '@firelayer/core/lib/firebase/firestore'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as chalk from 'chalk'
import { prompt } from 'inquirer'
import findRoot from '../utils/findRoot'

export default class Make extends Command {
  static description = 'maker helper'

  static examples = [`
  $ firelayer make migration create_posts_collection
  $ firelayer make model Post
  `]

  static args = [{ name: 'action', required: true }, { name: 'name', required: true }]

  async run() {
    const { args } = this.parse(Make)
    const root = await findRoot()

    process.chdir(root)

    const { action, name } = args

    switch (action) {
    case 'migration': {
      const filename = generateFilename(name || 'migration')

      fs.mkdirSync('./database/migrations', { recursive: true })
      fs.writeFileSync(`./database/migrations/${filename}.js`,
        `module.exports = {
  up: async ({ db }) => {},
  down: async ({ db }) => {}
}`)

      this.log(chalk.bold(`\nMigration created: database/migrations/${filename}.js\n`))

      return
    }

    case 'model': {
      // choose backend application
      const model = name.charAt(0).toUpperCase() + name.slice(1)

      const dirFilter = source => fs.lstatSync(source).isDirectory()
      const getDirectories = source => fs.readdirSync(source).map(name => path.join(source, name)).filter(dirFilter)
      const applications = getDirectories('./app').map(a => a.replace('app/', ''))

      const choices = applications.map(app => ({
        name: app
      }))

      this.log()

      const quiz = await prompt([{
        type: 'checkbox',
        name: 'apps',
        message: 'Select which applications to create the model:',
        choices
      }, {
        type: 'list',
        name: 'language',
        message: 'Choose the language for the model:',
        choices: [{
          name: 'Javascript'
        }, {
          name: 'Typescript'
        }]
      }])

      const { apps, language } = quiz

      if (apps.length === 0) return

      apps.forEach(app => {
        fs.mkdirSync(`./app/${app}/src/models`, { recursive: true })

        if (language === 'Javascript') {
          fs.writeFileSync(`./app/${app}/src/models/${model}.js`, JavascriptModel(model))

          this.log(chalk.bold(`\nModel created: app/${app}/${model}.js\n`))
        } else if (language === 'Typescript') {
          fs.writeFileSync(`./app/${app}/src/models/${model}.ts`, TypescriptModel(model))

          this.log(chalk.bold(`\nModel created: app/${app}/${model}.ts\n`))
        }
      })

      return
    }
    }
  }
}
