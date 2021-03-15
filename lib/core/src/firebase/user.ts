import * as admin from 'firebase-admin'
import { isEmail, isPhoneNumber, isUid } from '../utils/validators'
import { auth } from './core'

type UserRecord = admin.auth.UserRecord

export class User {
  id: string
  idType: string
  user: UserRecord

  constructor(id?) {
    this.id = null
    this.idType = null
    this.user = null

    if (id) {
      if (typeof id === 'string') {
        this.id = id

        if (isEmail(id)) {
          this.idType = 'email'
        } else if (isPhoneNumber(id)) {
          this.idType = 'phone'
        } else if (isUid(id)) {
          this.idType = 'uid'
        } else {
          throw new Error('Invalid Id format')
        }
      } else if (typeof id === 'object') {
        this.user = id
        this.id = this.user.uid
        this.idType = 'uid'
      } else {
        throw new Error('Invalid Id / User format')
      }
    }
  }

  async get(force?) {
    if (!force && this.user) return this.user

    if (!this.id) throw new Error('Could not get the user record, missing id property')

    switch (this.idType) {
    case 'uid':
      this.user = await auth().getUser(this.id)
      break
    case 'email':
      this.user = await auth().getUserByEmail(this.id)
      break
    case 'phone':
      this.user = await auth().getUserByPhoneNumber(this.id)
      break
    }

    this.id = this.user.uid
    this.idType = 'uid'

    return this.user
  }

  async create(data) {
    if (this.id) throw new Error('Could not create user, Id is already set')

    this.user = await auth().createUser(data)
    this.id = this.user.uid

    return this.user
  }

  async update(data = {}) {
    if (!this.id) throw new Error('Could not update the user record, missing id on instance')

    this.user = await auth().updateUser(this.id, data)

    return this.user
  }

  async save(data = {}) {
    return this.id ? await this.update(data) : await this.create(data)
  }

  async delete() {
    if (!this.id) throw new Error('Could not delete the user record, missing id on instance')

    return await auth().deleteUser(this.id)
  }

  async setClaims(claims, merge = false) {
    if (!this.id) throw new Error('Could not set claims to the user record, missing id on instance')

    let newClaims = {}

    if (merge) {
      const { customClaims } = await this.get(true)

      newClaims = {
        ...customClaims,
        ...claims,
      }
    } else {
      newClaims = claims
    }

    if (this.idType !== 'uid') await this.get()

    await auth().setCustomUserClaims(this.id, newClaims)

    return await this.get(true)
  }

  async setAdmin(isAdmin = false) {
    return this.setClaims({
      admin: isAdmin ? 1 : undefined,
    }, true)
  }

  async setDisabled(disabled = false) {
    if (this.idType !== 'uid') await this.get()

    return await this.update({
      disabled,
    })
  }

  async revokeTokens() {
    if (!this.id) throw new Error('Could not revoke user tokens, missing id on instance')

    if (this.idType !== 'uid') await this.get()

    return await auth().revokeRefreshTokens(this.id)
  }
}

export default User
