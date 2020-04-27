import * as fs from 'fs-extra'
import * as path from 'path'

const dirFilter = (source) => fs.lstatSync(source).isDirectory()

export default (source) => {
  if (fs.existsSync(source)) {
    return fs.readdirSync(source).map((name) => path.join(source, name)).filter(dirFilter)
  }

  return []
}
