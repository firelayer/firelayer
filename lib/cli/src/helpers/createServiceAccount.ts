// import { createServiceAccount } from 'firebase-tools/lib/gcp/iam'
// import { grantRoles } from 'firebase-tools/lib/extensions/rolesHelper'

// export default async (): Promise<any> => {
//   const random5chars = Math.random().toString(36).substring(8)

//   const projectId = 'firebase-boilerplate'

//   const serviceAccount = await createServiceAccount(
//     projectId,
//     `firelayer-adminsdk-${random5chars}`,
//     'Firelayer Admin SDK',
//     'Firelayer CLI'
//   )

//   await grantRoles(
//     projectId,
//     serviceAccount.email,
//     [
//       'storage.admin',
//       'datastore.databases.export',
//       'datastore.databases.import',
//       'firebase.admin',
//       'iam.serviceAccountTokenCreator'
//     ]
//   )
// }
