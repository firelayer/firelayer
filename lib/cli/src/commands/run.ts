import Command from '../base'
import * as chalk from 'chalk'
import * as path from 'path'
import * as fs from 'fs-extra'
import getEnvVariables from '../helpers/getEnvVariables'
import { spawn } from '../utils/spawn'
import { TermSignals } from '../utils/signalTermination'
import argParser from '../utils/argParser'

export default class Run extends Command {
  static description = 'run shell commands with injected firelayer env variables'

  static examples = ['$ firelayer run "node index.js"']

  static args = [{ name: 'command' }]

  async run() {
    const { args } = this.parse(Run)
    const { command } = args

    /**
     * Find current environment path to service key file
     */
    const keyFile = `./config/keys/${this.env}.key.json`
    const defaultKeyFile = './config/keys/key.json'

    let keyPath = ''

    if (fs.existsSync(keyFile)) {
      keyPath = path.resolve(keyFile)
    } else if (this.env === 'default' && fs.existsSync(defaultKeyFile)) {
      keyPath = path.resolve(defaultKeyFile)
    }

    if (!keyPath) {
      const notFound = this.env === 'default' ? `key.json or ${this.env}.key.json` : `${this.env}.key.json`

      this.log(chalk.bold(`\nFailed to get credentials from 'config/keys' > '${notFound}'\n`))
      process.exit(0)
    }

    const envVars = getEnvVariables(this.env)

    envVars['GOOGLE_APPLICATION_CREDENTIALS'] = keyPath

    const env = Object.assign({}, process.env, envVars)

    // run the command from the arguments
    const commandParsed = argParser(command)

    const proc = spawn(commandParsed[0], commandParsed.slice(1), {
      cwd: this.cwd,
      stdio: 'inherit',
      shell: true,
      env
    })

    // Handle any termination signals for parent and child proceses
    const signals = new TermSignals({ verbose: true })

    signals.handleUncaughtExceptions()
    signals.handleTermSignals(proc)

    return
  }
}
