import { realtime } from './core'
import DatabaseMaintenanceRules from './maintenance/database.rules'
import FirestoreMaintenanceRules from './maintenance/firestore.rules'
import StorageMaintenanceRules from './maintenance/storage.rules'
import { updateDatabaseRules, updateFirestoreRules, updateStorageRules } from './rules'

const SETTINGS_PATH = '_settings'

export interface MaintenanceRuleConfig {
  rules?: string;
  enabled?: boolean;
}

export interface MaintenanceConfig {
  database?: MaintenanceRuleConfig;
  firestore?: MaintenanceRuleConfig;
  storage?: MaintenanceRuleConfig;
  useRules?: boolean;
  settingsPath?: string;
}

export const startMaintenance = async (config?: MaintenanceConfig) => {
  const settingsPath = (config && config.settingsPath) || SETTINGS_PATH

  await realtime().ref(settingsPath).update({ maintenance: true })

  const tasks = []

  if (!config) {
    tasks.push(updateDatabaseRules(DatabaseMaintenanceRules))
    tasks.push(updateFirestoreRules(FirestoreMaintenanceRules))
    tasks.push(updateStorageRules(StorageMaintenanceRules))
  } else if (config.useRules) {
    if (config.database.enabled) tasks.push(updateDatabaseRules(config.database.rules || DatabaseMaintenanceRules))
    if (config.firestore.enabled) tasks.push(updateFirestoreRules(config.firestore.rules || FirestoreMaintenanceRules))
    if (config.storage.enabled) tasks.push(updateStorageRules(config.storage.rules || StorageMaintenanceRules))
  }

  await Promise.all(tasks)

  return true
}

export const stopMaintenance = async (config?: MaintenanceConfig) => {
  const settingsPath = (config && config.settingsPath) || SETTINGS_PATH

  if (config && config.useRules) {
    const tasks = []

    if (config.database.enabled) tasks.push(updateDatabaseRules(config.database.rules))
    if (config.firestore.enabled) tasks.push(updateFirestoreRules(config.firestore.rules))
    if (config.storage.enabled) tasks.push(updateStorageRules(config.storage.rules))

    await Promise.all(tasks)
  }

  await realtime().ref(settingsPath).update({ maintenance: false })

  return true
}

export const isInMaintenance = async (settingsPath?: string) => {
  const doc = await realtime().ref(settingsPath || SETTINGS_PATH).once('value')

  if (!doc.exists()) return false

  const { maintenance } = doc.val()

  return maintenance
}
