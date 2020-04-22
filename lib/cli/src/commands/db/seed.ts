import { Command } from '@oclif/command'
import findRoot from '../../utils/findRoot'
import dbSeed from '../../helpers/dbSeed'

export default class DBSeed extends Command {
  static description = 'database seeder'

  static examples = ['$ firelayer db:seed']

  async run() {
    const root = await findRoot()

    process.chdir(root)

    await dbSeed()
  }
}
