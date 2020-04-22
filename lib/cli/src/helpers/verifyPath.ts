import * as inquirer from 'inquirer'
import * as chalk from 'chalk'
import * as fs from 'fs-extra'

export default async (projectName, targetDir) => {
  const inCurrent = projectName === '.'

  if (fs.existsSync(targetDir)) {
    if (inCurrent) {
      const { ok } = await inquirer.prompt([{
        name: 'ok',
        type: 'confirm',
        message: 'Generate project in current directory?'
      }])

      if (!ok) {
        return false
      }
    } else {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            { name: 'Merge', value: 'merge' },
            { name: 'Cancel', value: false }
          ]
        }
      ])

      if (!action) {
        return false
      } else if (action === 'overwrite') {
        console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
        await fs.remove(targetDir)
      }
    }
  }

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir)

  return true
}
