import * as functions from 'firebase-functions'
import { lazyImport } from '@firelayer/core/lib/utils'

export const api = functions.https.onRequest(lazyImport('./api', __dirname))
