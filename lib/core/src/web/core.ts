import * as _firebase from 'firebase/app'
import 'firebase/firestore'

export const firebase = _firebase
export const db = firebase.firestore
export const timestamp = firebase.firestore.Timestamp.now
export const { serverTimestamp } = firebase.firestore.FieldValue
