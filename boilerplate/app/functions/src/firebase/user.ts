import { User as UserModel } from './core'

export class User extends UserModel {
  constructor(id?) {
    super(id)
  }
}

export default User
