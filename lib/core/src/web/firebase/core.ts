import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/performance'

export const { auth, storage } = firebase
export const db = firebase.firestore
export const realtime = firebase.database

export const timestamp = firebase.firestore.Timestamp.now
export const { serverTimestamp } = firebase.firestore.FieldValue
