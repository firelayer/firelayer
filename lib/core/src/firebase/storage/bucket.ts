import { Bucket } from '@google-cloud/storage'
import { storage } from '../core'

export const getBucket = async (name: string): Promise<Bucket> => {
  const bucket: Bucket = storage().bucket(name)
  const exists = await bucket.exists()

  if (!exists[0]) await bucket.create()

  return bucket
}
