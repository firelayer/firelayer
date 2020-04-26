import * as chalk from 'chalk'
import * as semver from 'semver'
import cmd from './cmd'

export default async () => {
  try {
    // check node version
    if (semver.lt(process.version, '10.0.0')) {
      console.log(`\nFirelayer needs ${chalk.bold('Node version >= 10')}, please update to continue.`)
      console.log('\nAn easy way to have multiple node versions would be NVM: https://github.com/nvm-sh/nvm\n')

      process.exit(1)
    }

    // check firebase version
    const output = await cmd('firebase --version')
    const { 0: major } = output.split('.')

    if (parseInt(major) < 8) {
      console.log(`\nFirelayer needs ${chalk.bold('Firebase CLI version >= 8.0.0')}, please update to continue.`)
      console.log(`\nRun ${chalk.bold.cyan('npm i -g firebase-tools')} to update\n`)

      process.exit(1)
    }

  } catch (error) {
    console.log(chalk.bold.red('\nError: Firebase CLI not found.\n'))
    console.log(`See: ${chalk.cyan('https://firebase.google.com/docs/cli')} on how to install Firebase CLI before proceeding.\n`)

    process.exit(1)
  }
}
