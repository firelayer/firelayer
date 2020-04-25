import { spawn } from './spawn'
import { TermSignals } from './signalTermination'

export default (command, opts = { cwd: undefined, env: undefined, windowsVerbatimArguments: undefined }) => {
  return new Promise((resolve, reject) => {
    try {
      let file, args

      if (process.platform === 'win32') {
        file = 'cmd.exe'
        args = ['/s', '/c', '"' + command + '"']
        opts.windowsVerbatimArguments = true
      } else {
        file = '/bin/sh'
        args = ['-c', command]
      }

      const proc = spawn(file, args, {
        cwd: opts.cwd,
        stdio: 'inherit',
        shell: true,
        env: opts.env,
        windowsVerbatimArguments: opts.windowsVerbatimArguments
      })

      // Handle any termination signals for parent and child proceses
      const signals = new TermSignals()

      signals.handleUncaughtExceptions()
      signals.handleTermSignals(proc, resolve)
    } catch (error) {
      reject(error)
    }
  })
}
