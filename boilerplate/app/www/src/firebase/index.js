import * as core from '@firelayer/core/lib/web/firebase'
import config from '../config'

if (core.firebase.apps.length === 0) {
  core.firebase.initializeApp(config.firebase)
}

export const { auth, firebase, firestore, db, realtime, timestamp, serverTimestamp, Firemodel } = core
