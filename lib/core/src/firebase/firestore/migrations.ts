/* eslint-disable no-await-in-loop */
import * as fs from 'fs-extra'
import * as path from 'path'
import { db, timestamp, serverTimestamp } from '../core'

const MIGRATIONS_COLLECTION = '_MIGRATIONS'
const context = { db, timestamp, serverTimestamp }

export interface MigrateConfig {
  collection?: string;
}

export interface RollbackConfig {
  collection?: string;
  steps?: number;
}

export async function migrate(migrationsFolder: string, options: MigrateConfig = {}) {
  const migrationFiles = getMigrationsFiles(migrationsFolder)

  if (migrationFiles.length === 0) {
    console.log('Nothing to migrate.\n')

    return
  }

  const migrations = migrationFiles.map(m => getMigrationName(m))

  const mdb = db().collection(options.collection || MIGRATIONS_COLLECTION)
  const ranMigrationsDocs = await mdb.listDocuments()
  const ranMigrations = ranMigrationsDocs.map(m => m.id)

  const queuedMigrations = migrations.filter(m => ranMigrations.indexOf(m) === -1)

  if (queuedMigrations.length === 0) {
    console.log('Nothing to migrate.\n')

    return
  }

  for (let i = 0, len = queuedMigrations.length; i < len; i++) {
    const file = queuedMigrations[i]
    const name = getMigrationName(file)

    try {
      const migration = require(path.join(migrationsFolder, file))

      console.log(`\nMigrating ${name}..`)

      console.time(`Migrated ${name}`)
      await migration.up(context)
      console.timeEnd(`Migrated ${name}`)

      await mdb.doc(name).set({
        migratedAt: serverTimestamp()
      })

    } catch (error) {
      console.log(error.message)
      console.log(`Error migrating ${name}`)

      return
    }
  }
}

export async function rollback(migrationsFolder: string, options: RollbackConfig = {}) {
  const mdb = db().collection(options.collection || MIGRATIONS_COLLECTION)

  const ranMigrationsQuery = await mdb.orderBy('migratedAt', 'desc').get()
  let ranMigrations = ranMigrationsQuery.docs.map(d => d.id)

  if (ranMigrations.length === 0) {
    console.log('Nothing to rollback.\n')

    return
  }

  const steps = options.steps || 1

  ranMigrations = ranMigrations.slice(0, steps)

  for (let i = 0, len = ranMigrations.length; i < len; i++) {
    const name = ranMigrations[i]
    const file = name + '.js'

    try {
      const migration = require(path.join(migrationsFolder, file))

      console.log(`\nRolling back: ${name}..`)

      console.time(`Rolled back ${name}`)
      await migration.down(context)
      console.timeEnd(`Rolled back ${name}`)

      await mdb.doc(name).delete()

    } catch (error) {
      console.log(error.message)
      console.log(`Error rolling back ${name}`)

      return
    }
  }
}

const getMigrationsFiles = (folder: string): Array<string> => fs.readdirSync(folder).filter(name => {
  const file = path.join(folder, name)

  return !fs.lstatSync(file).isDirectory() && /(\.js|\.ts)$/.test(file)
})

const getMigrationName = (file: string) => file.replace('.js', '')

export const generateFilename = (name: string) => {
  const nowISO = (new Date()).toISOString()
  const prefix = nowISO.split('.')[0].split('-').join('_').replace('T', '_').split(':').join('')

  name = name
    .toLowerCase()
    // remove accents
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    // remove special chars
    .replace(/[^\w\s]/gi, '')
    .split(' ').join('_')

  return `${prefix}_${name}`
}
