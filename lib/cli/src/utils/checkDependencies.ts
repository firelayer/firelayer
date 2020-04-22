import * as chalk from 'chalk'
import cmd from './cmd'

export default async () => {
  try {
    const output = await cmd('firebase --version')
    const { 0: major } = output.split('.')

    if (parseInt(major) < 8) {
      console.log('\nFirelayer needs Firebase CLI version >= 8.0.0, please update to continue.')
      console.log(`\nRun ${chalk.bold.cyan('npm i -g firebase-tools')} to update\n`)

      process.exit(1)
    }
  } catch (error) {
    console.log(chalk.bold.red('\nError: Firebase CLI not found.\n'))
    console.log(`See: ${chalk.cyan('https://firebase.google.com/docs/cli')} on how to install Firebase CLI before proceeding.\n`)

    process.exit(1)
  }
}
