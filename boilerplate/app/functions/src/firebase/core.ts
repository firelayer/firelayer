import * as admin from 'firebase-admin'
import config from '../config'

let firebaseConfig = {}

// Local development
if (process.env.NODE_ENV !== 'production') {
  firebaseConfig = {
    credential: admin.credential.applicationDefault(),
    databaseURL: config.firebase.databaseURL
  }
}

export const app = admin.initializeApp(firebaseConfig)

export * from '@firelayer/core/lib/firebase'
