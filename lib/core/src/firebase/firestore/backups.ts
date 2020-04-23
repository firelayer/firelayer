import { v1 } from '@google-cloud/firestore'

export const backup = async (projectId: string, bucketUrl: string, collectionIds: Array<string> = []) => {
  try {
    const client = new v1.FirestoreAdminClient()
    const databaseName = client.databasePath(projectId, '(default)')
    const responses = await client.exportDocuments({
      name: databaseName,
      outputUriPrefix: bucketUrl,
      collectionIds
    })

    const { 0: response } = responses

    return response
  } catch (error) {
    console.log(error.message)
    permissionsError(projectId)
  }

  return null
}

export const restore = async (projectId: string, bucketUrl: string, collectionIds: Array<string> = []) => {
  try {
    const client = new v1.FirestoreAdminClient()
    const databaseName = client.databasePath(projectId, '(default)')
    const responses = await client.importDocuments({
      name: databaseName,
      inputUriPrefix: bucketUrl,
      collectionIds
    })

    const { 0: response } = responses

    return response
  } catch (error) {
    console.log(error.message)
    permissionsError(projectId)
  }

  return null
}

function permissionsError(projectId) {
  console.log(`
  Please make sure you have all the permissions enabled:
  - Enabled billing (Only GCP projects with billing enabled can use the export and import feature.)
  see: https://cloud.google.com/billing/docs/how-to/modify-project')

  - Add "Cloud Datastore Import Export Admin" and "Storage Admin" to the service account you are using.
  see: https://firebase.google.com/docs/firestore/solutions/schedule-export#configure_access_permissions'
  check: https://console.cloud.google.com/iam-admin/iam?project=${projectId}
  `)
}
