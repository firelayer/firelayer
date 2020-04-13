export const JavascriptModel = model => `const { db, Firemodel } = require('../firebase/core')

exports = class MODEL_NAME extends Firemodel {
  constructor(id) {
    super(id)
  }

  get path() {
    // REPLACE _ with correct path to collection
    return db().collection('_')
  }
}

module.exports = MODEL_NAME
`.split('MODEL_NAME').join(model)

export const TypescriptModel = model => `import { db, Firemodel } from '../firebase/core'

export class MODEL_NAME extends Firemodel {
  constructor(id) {
    super(id)
  }

  get path() {
    // REPLACE _ with correct path to collection
    return db().collection('_')
  }
}

export default MODEL_NAME
`.split('MODEL_NAME').join(model)
