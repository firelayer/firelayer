import * as functions from 'firebase-functions'

let config = functions.config()

// Local development
if (process.env.NODE_ENV !== 'production') {
  try {
    config = {
      env: JSON.parse(process.env.functions)
    }
  } catch (error) {
    config = {
      env: {}
    }
  }
}

export default config.env
