import * as findUp from 'find-up'
import * as chalk from 'chalk'
import * as path from 'path'

export default async () => {
  const root = await findUp('firebase.json')

  if (!root) throw new Error(chalk.red(`Could not find project root with the file '${chalk.bold('firebase.json')}'`))

  return path.dirname(root)
}
