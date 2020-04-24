import * as findUp from 'find-up'
import * as path from 'path'

export default async () => {
  const root = await findUp('firebase.json')

  if (!root) throw new Error('Could not find project root with the file \'firebase.json\'')

  return path.dirname(root)
}
