import * as admin from 'firebase-admin'
import config from '../config'

let firebaseConfig = {}

// Local development
if (process.env.NODE_ENV !== 'production') {
  const fs = require('fs')

  /**
   * Generate a service account key file
   * rename it to 'service-key.json' and add to the config folder
   *
   * https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk
   */
  if (fs.existsSync('./config/service-key.json')) {
    const serviceAccount = require('../config/service-key.json')

    firebaseConfig = {
      credential: admin.credential.cert(serviceAccount),
      databaseURL: config.firebase.databaseURL
    }
  }
}

admin.initializeApp(firebaseConfig)

export default {
  auth: admin.auth,
  config: config.firebase,
  db: admin.firestore,
  realtime: admin.database,
  storage: admin.storage().bucket(config.firebase.storageBucket),
  timestamp: admin.firestore.FieldValue.serverTimestamp
}
