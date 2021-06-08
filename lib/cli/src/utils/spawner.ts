import { spawn } from './spawn'
import argParser from './argParser'
import { TermSignals } from './signalTermination'

export default (command, opts = { cwd: undefined, env: undefined }) => {
  return new Promise((resolve, reject) => {
    try {
      let proc

      if (process.platform === 'win32') {
        proc = spawn('cmd.exe', ['/s', '/c', '"' + command + '"'], {
          cwd: opts.cwd,
          stdio: 'inherit',
          shell: true,
          env: opts.env,
          windowsVerbatimArguments: true,
        })
      } else {
        const commandParsed = argParser(command)

        proc = spawn(commandParsed[0], commandParsed.slice(1), {
          cwd: opts.cwd,
          stdio: 'inherit',
          shell: true,
          env: opts.env,
        })
      }

      // Handle any termination signals for parent and child proceses
      const signals = new TermSignals()

      signals.handleUncaughtExceptions()
      signals.handleTermSignals(proc, () => { return resolve(null)})
    } catch (error) {
      reject(error)
    }
  })
}
