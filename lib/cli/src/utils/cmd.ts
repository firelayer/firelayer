import * as sh from 'shelljs'

sh.config.silent = true
sh.config.fatal = true

export default (cmd, opts = {}, env = {}): any => {
  return new Promise((resolve, reject) => {
    for (const key in env) {
      sh.env[key] = env[key]
    }

    sh.exec(cmd, opts, (code, stdout, stderr) => {
      if (code !== 0) reject(new Error(stderr))

      resolve(stdout)
    })
  })
}
