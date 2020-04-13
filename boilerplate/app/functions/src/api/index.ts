import * as express from 'express'
import { lazyImport } from '@firelayer/core/lib/utils'

const APIv1 = lazyImport('./v1', __dirname)

export default (req, res) => {
  const app = express()

  app.disable('etag')

  app.use('/api/', APIv1)
  app.use('/api/v1/', APIv1)

  // Error handling
  app.use((err, req, res, next) => {
    console.error(err.message || err, '\n', err.stack)
    res.status(err.statusCode || 500).send({
      message: err.message || 'Unexpected error!'
    })
  })

  return app(req, res)
}
