import { spawn } from './spawn'
import argParser from './argParser'
import { TermSignals } from './signalTermination'

export default (command, opts = { cwd: undefined, env: undefined }) => {
  return new Promise((resolve, reject) => {
    try {
      // run the command from the arguments
      const commandParsed = argParser(command)

      const proc = spawn(commandParsed[0], commandParsed.slice(1), {
        cwd: opts.cwd,
        stdio: 'inherit',
        shell: true,
        env: opts.env
      })

      // Handle any termination signals for parent and child proceses
      const signals = new TermSignals({ verbose: true })

      signals.handleUncaughtExceptions()
      signals.handleTermSignals(proc, resolve)
    } catch (error) {
      reject(error)
    }
  })
}
