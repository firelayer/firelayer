import * as admin from 'firebase-admin'
import { omit } from 'lodash'
import { db, timestamp } from '../core'

type CollectionReference = admin.firestore.CollectionReference;
type DocumentReference = admin.firestore.DocumentReference;

export class Firemodel {
  id: string
  data: object

  constructor(id?) {
    this.data = {}

    if (id) {
      this.id = id
    }
  }

  get path(): CollectionReference {
    return db().collection('_')
  }

  get doc(): DocumentReference {
    return this.path.doc(this.id)
  }

  async set(id, data) {
    const stamp = timestamp()

    await this.path.doc(id).set({
      ...data,
      createdAt: stamp,
      updatedAt: stamp
    })

    this.id = id
    this.data = {
      ...data,
      createdAt: stamp,
      updatedAt: stamp
    }

    return this
  }

  async save(data) {
    const stamp = timestamp()

    if (this.id) {
      const { writeTime } = await this.doc.update({
        ...omit(data, 'createdAt'),
        updatedAt: stamp
      })

      this.data = {
        ...this.data,
        ...data,
        updatedAt: writeTime
      }
    } else {
      const result = await this.path.add({
        ...data,
        createdAt: stamp,
        updatedAt: stamp
      })

      this.id = result.id

      await this.get()
    }

    return this
  }

  async get() {
    if (!this.id) throw new Error('Could not get document, missing id property')

    const result = await this.doc.get()

    this.data = result.data()

    return this
  }

  delete() {
    return this.doc.delete()
  }
}

export default Firemodel
