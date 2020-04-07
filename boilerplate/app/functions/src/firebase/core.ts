import * as admin from 'firebase-admin'
// import config from '../config'

const firebaseConfig = {}

// Local development
// if (process.env.NODE_ENV !== 'production') {
//   const { credentials } = require('../config/service-key')

//   firebaseConfig = {
//     credential: admin.credential.cert(credentials),
//     databaseURL: config.firebase.databaseURL
//   }
// }

export const app = admin.initializeApp(firebaseConfig)
export {
  auth,
  db,
  realtime,
  storage,
  timestamp
} from '@firelayer/core/lib/firebase'
