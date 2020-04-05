import * as express from 'express'

const router = express.Router()

/**
 * PUBLIC API
 */
router.get('/', (req, res) => {
  res.send({
    version: '1.0.0'
  })
})

export default router
