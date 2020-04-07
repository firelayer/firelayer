import * as functions from 'firebase-functions'

let config = functions.config()

// Local development
if (process.env.NODE_ENV !== 'production') {
  const localEnv = require('./env')
  const env = {
    ...localEnv
  }

  config = { env }
}

console.log(config)

export default config.env
