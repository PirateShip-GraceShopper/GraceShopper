const router = require('express').Router()
module.exports = router
const reviews = require('./reviews')

router.use('/users', require('./users'))
router.use('/reviews', reviews)

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
