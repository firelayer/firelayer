import * as admin from 'firebase-admin'
import { omit } from 'lodash'
import { db, timestamp, serverTimestamp } from '../core'

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
    const serverStamp = serverTimestamp()

    const { writeTime } = await this.path.doc(id).set({
      ...data,
      createdAt: serverStamp,
      updatedAt: serverStamp
    })

    this.id = id
    this.data = {
      ...data,
      createdAt: writeTime,
      updatedAt: writeTime
    }

    return this
  }

  async save(data) {
    const serverStamp = serverTimestamp()

    if (this.id) {
      const { writeTime } = await this.doc.update({
        ...omit(data, 'createdAt'),
        updatedAt: serverStamp
      })

      this.data = {
        ...this.data,
        ...data,
        updatedAt: writeTime
      }
    } else {
      const result = await this.path.add({
        ...data,
        createdAt: serverStamp,
        updatedAt: serverStamp
      })

      // so we don't have to trigger a .get() just to see the new stamps
      const emulatedStamp = timestamp()

      this.id = result.id
      this.data = {
        ...data,
        createdAt: emulatedStamp,
        updatedAt: emulatedStamp
      }
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
