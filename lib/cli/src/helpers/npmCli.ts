import { prompt } from 'inquirer'
import { execSync } from 'child_process'

export default async () => {
  // check if has yarn
  const npmClients = ['npm']

  try {
    execSync('yarn --version', { stdio: 'ignore' })

    npmClients.push('yarn')
  // eslint-disable-next-line no-empty
  } catch (e) {}

  if (npmClients.length === 1) return 'npm'

  const choices = npmClients.map((client) => ({
    name: client,
  }))

  const { npmclient } = await prompt([{
    type: 'list',
    name: 'npmclient',
    message: 'Select which package manager to use in this project:',
    choices,
  }])

  return npmclient
}
