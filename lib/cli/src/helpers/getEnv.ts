import * as chalk from 'chalk'
import * as fs from 'fs-extra'

export default () => {
  let env = 'default'

  if (!fs.existsSync('.firelayer/env')) {
    this.log(`\nCreating '${chalk.bold('.firelayer/env')}' missing file..`)

    fs.mkdirSync('.firelayer', { recursive: true })
    fs.writeFileSync('.firelayer/env', 'default')
  } else {
    env = fs.readFileSync('./.firelayer/env', 'utf8')
  }

  return env
}
