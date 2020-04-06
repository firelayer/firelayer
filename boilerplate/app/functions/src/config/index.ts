import * as functions from 'firebase-functions'

let config = functions.config()

// Local development
if (process.env.NODE_ENV !== 'production') {
  const localEnv = require('./env.json')
  const env = {
    ...localEnv
  }

  config = { env }
}

export default config.env
