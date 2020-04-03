import * as sh from 'shelljs'

sh.config.silent = true
sh.config.fatal = true

export default (cmd, opts = {}) => {
  return new Promise((resolve, reject) => {
    sh.exec(cmd, opts, (code, stdout, stderr) => {
      if (code !== 0) reject(new Error(stderr))

      resolve(stdout)
    })
  })
}
