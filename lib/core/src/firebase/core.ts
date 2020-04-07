import * as admin from 'firebase-admin'

export const { auth, storage } = admin
export const db = admin.firestore
export const realtime = admin.database
export const timestamp = admin.firestore.FieldValue.serverTimestamp
