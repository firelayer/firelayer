import * as chalk from 'chalk'
import * as semver from 'semver'
import * as shell from 'shelljs'

export default async () => {
  if (semver.lt(process.version, '10.0.0')) {
    console.log(`\nFirelayer needs ${chalk.bold('Node version >= 10')}, please update to continue.`)
    console.log('\nAn easy way to have multiple node versions would be NVM: https://github.com/nvm-sh/nvm\n')

    process.exit(1)
  }

  if (!shell.which('git')) {
    console.log(`\nFirelayer requires ${chalk.bold('git')}, please install git to continue.`)
    console.log('\nTo install git: https://git-scm.com\n')

    process.exit(1)
  }
}
