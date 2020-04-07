import './core'
import { User as UserModel } from '@firelayer/core/lib/firebase/user'

export class User extends UserModel {
  constructor(id?) {
    super(id)
  }
}

export default User
