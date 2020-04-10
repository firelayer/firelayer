import * as _admin from 'firebase-admin'

export const admin = _admin
export const { auth, storage } = admin
export const db = admin.firestore
export const realtime = admin.database

export const timestamp = admin.firestore.Timestamp.now
export const { serverTimestamp } = admin.firestore.FieldValue
