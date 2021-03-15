import * as admin from 'firebase-admin'
import { db, timestamp, serverTimestamp } from '../../core'

type CollectionReference = admin.firestore.CollectionReference;
type DocumentReference = admin.firestore.DocumentReference;
type DocumentSnapshot = admin.firestore.DocumentSnapshot

export class Firemodel {
  id: string
  data: Record<string, unknown>
  snapshot: DocumentSnapshot

  constructor(id?) {
    this.data = {}

    if (id) {
      if (typeof id === 'string') {
        this.id = id
      } else {
        const snapshot = id

        this.id = snapshot.id
        this.data = snapshot.data()
        this.snapshot = snapshot
      }
    }
  }

  get collection(): CollectionReference {
    return db().collection('_')
  }

  get doc(): DocumentReference {
    return this.collection.doc(this.id)
  }

  async set(id, data) {
    const serverStamp = serverTimestamp()

    const { writeTime } = await this.collection.doc(id).set({
      ...data,
      createdAt: serverStamp,
      updatedAt: serverStamp,
    })

    this.id = id
    this.data = {
      ...data,
      createdAt: writeTime,
      updatedAt: writeTime,
    }

    return this
  }

  async save(data) {
    const serverStamp = serverTimestamp()

    if (this.id) {
      // omit createdAt
      const copy = {}
      const keys = Object.keys(data)

      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i]

        if (key !== 'createdAt') copy[key] = data[key]
      }

      const { writeTime } = await this.doc.update({
        ...copy,
        updatedAt: serverStamp,
      })

      this.data = {
        ...this.data,
        ...data,
        updatedAt: writeTime,
      }
    } else {
      const result = await this.collection.add({
        ...data,
        createdAt: serverStamp,
        updatedAt: serverStamp,
      })

      // so we don't have to trigger a .get() just to see the new stamps
      const emulatedStamp = timestamp()

      this.id = result.id
      this.data = {
        ...data,
        createdAt: emulatedStamp,
        updatedAt: emulatedStamp,
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
