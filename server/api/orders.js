const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
  .then(orders => res.json(orders))
  .catch(next)
})

router.param('id', (req, res, next, id) => {
  Order.findById(id)
  .then(order => {
    if (!order) res.sendStatus(404)
    req.order = order
    next()
  })
})

router.get('/:id', (req, res, next) => res.json(req.order))

router.post('/', (req, res, next) => {
  Order.create(req.body)
  .then(order => res.json(order))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  req.order.update(req.body)
  .then(() => res.sendStatus(res.statusCode))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  req.order.destroy()
  .then(() => res.sendStatus(res.statusCode))
  .catch(next)
})
