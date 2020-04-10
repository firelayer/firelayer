import { realtime } from './core'
import DatabaseMaintenanceRules from './maintenance/database.rules'
import FirestoreMaintenanceRules from './maintenance/firestore.rules'
import StorageMaintenanceRules from './maintenance/storage.rules'
import { updateDatabaseRules, updateFirestoreRules, updateStorageRules } from './rules'

const ref = realtime().ref('_SETTINGS')

export interface MaintenanceRuleConfig {
  rules?: string;
  enabled?: boolean;
}

export interface MaintenanceConfig {
  database?: MaintenanceRuleConfig;
  firestore?: MaintenanceRuleConfig;
  storage?: MaintenanceRuleConfig;
  useRules?: boolean;
}

export const startMaintenance = async (config?: MaintenanceConfig) => {
  await ref.update({ maintenance: true })

  const tasks = []

  if (!config) {
    tasks.push(updateDatabaseRules(DatabaseMaintenanceRules))
    tasks.push(updateFirestoreRules(FirestoreMaintenanceRules))
    tasks.push(updateStorageRules(StorageMaintenanceRules))
  } else if (config.useRules) {
    if (config.database.enabled) updateDatabaseRules(config.database.rules || DatabaseMaintenanceRules)
    if (config.firestore.enabled) updateFirestoreRules(config.firestore.rules || FirestoreMaintenanceRules)
    if (config.storage.enabled) updateStorageRules(config.storage.rules || StorageMaintenanceRules)
  }

  await Promise.all(tasks)

  return true
}

export const stopMaintenance = async (config?: MaintenanceConfig) => {
  if (config && config.useRules) {
    if (config.database.enabled) updateDatabaseRules(config.database.rules)
    if (config.firestore.enabled) updateFirestoreRules(config.firestore.rules)
    if (config.storage.enabled) updateStorageRules(config.storage.rules)
  }

  await ref.update({ maintenance: false })

  return true
}

export const isInMaintenance = async () => {
  const doc = await ref.once('value')

  if (!doc.exists()) return false

  const { maintenance } = doc.val()

  return maintenance
}
