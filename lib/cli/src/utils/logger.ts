import * as fs from 'fs'

export default async (from, message) => {
  const timestamp = (new Date()).toUTCString()

  try {
    let log = `[${from} | ${timestamp}]: `

    if (message instanceof Error) {
      log = log + `Error: ${message.message}\n${message.stack}`
    } else if (typeof message === 'object') {
      log = log + JSON.stringify(message)
    } else {
      log = log + message
    }

    fs.appendFileSync('firelayer-debug.log', `${log}\n`)
  } catch (error) {
    console.log('Error logging to firebase-debug.log')
    console.error(error)
  }
}
