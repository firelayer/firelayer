import * as admin from 'firebase-admin'

type Ruleset = admin.securityRules.Ruleset

export const updateFirestoreRules = (rules: string): Promise<Ruleset> => {
  return admin.securityRules().releaseFirestoreRulesetFromSource(rules)
}

export const updateStorageRules = (rules: string): Promise<Ruleset> => {
  return admin.securityRules().releaseStorageRulesetFromSource(rules)
}

export const updateDatabaseRules = (rules: string): Promise<void> => {
  return admin.database().setRules(rules)
}

export const getFirestoreRules = (): Promise<Ruleset> => {
  return admin.securityRules().getFirestoreRuleset()
}

export const getStorageRules = (): Promise<Ruleset> => {
  return admin.securityRules().getStorageRuleset()
}

export const getDatabaseRules = (): Promise<object> => {
  return admin.database().getRulesJSON()
}

// while this happens https://github.com/microsoft/TypeScript/issues/37664
export const getAllRules = async () => {
  const { firestore, database, storage } = await _getAllRules()

  return {
    firestore: JSON.stringify(firestore.source),
    database: JSON.stringify(database),
    storage: JSON.stringify(storage.source)
  }
}

const _getAllRules = async (): Promise<any> => {
  const tasks = [getFirestoreRules(), getDatabaseRules(), getStorageRules()]
  const { 0: firestore, 1: database, 2: storage } =  await Promise.all(tasks)

  return { firestore, database, storage }
}
