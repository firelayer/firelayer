import Command from '../../base'
import dbSeed from '../../helpers/dbSeed'

export default class DBSeed extends Command {
  static description = 'database seeder'

  static examples = ['$ firelayer db:seed']

  async run() {
    await dbSeed()
  }
}
