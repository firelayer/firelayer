import * as chalk from 'chalk'
import * as Listr from 'listr'
import * as fs from 'fs-extra'
import { storage } from '@firelayer/core'
import getEnvVariables from './getEnvVariables'
import initAdmin from './initAdmin'
import getEnv from './getEnv'
import logger from '../utils/logger'

export default async () => {
  const envName = getEnv()

  let cors: any = {}

  const envVariables = getEnvVariables(envName)
  const functionVars = JSON.parse(envVariables.functions)
  const { storageBucket } = functionVars.firebase

  const tasks = new Listr([{
    title: 'Initialize admin',
    task: initAdmin
  }, {
    title: 'Get cors configuration file',
    task: () => {
      const corsConfig = fs.readFileSync('./rules/storage-cors.json', 'utf8')

      cors = JSON.parse(corsConfig)
    }
  }, {
    title: `Deploying storage cors (bucket: ${chalk.bold(storageBucket)}).`,
    task: async () => {
      const bucket = storage().bucket(storageBucket)

      await bucket.setCorsConfiguration(cors)
    }
  }])

  try {
    await tasks.run()
  } catch (e) {
    throw new Error(e)
  }

  console.log(`\n🎉  Successfully deployed cors configuration for bucket: '${chalk.bold(storageBucket)}'.\n`)
}
