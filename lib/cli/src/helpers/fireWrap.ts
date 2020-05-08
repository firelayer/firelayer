import * as chalk from 'chalk'
import * as firebaseCLI from 'firebase-tools'
import logger from '../utils/logger'

export default async (command) => {
  let output

  try {
    output = await command()
  } catch (error) {
    if (error.message.toLowerCase().indexOf('auth') !== -1) {
      try {
        await firebaseCLI.login({ reauth: true })

        output = await command()
      } catch (loginError) {
        logger('fire-wrap', loginError)

        console.log(chalk.bold.red('\nError: ' + `Please run ${chalk.bold('firebase login')} and try again.\n`))
        process.exit(1)
      }
    } else {
      logger('fire-wrap', error)
      throw error
    }
  }

  return output
}
