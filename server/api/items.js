const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Item.findAll()
  .then(items => res.json(items))
  .catch(next)
})

router.param('id', (req, res, next, id) => {
  Item.findById(id)
  .then(item => {
    if (!item) res.sendStatus(404)
    req.item = item
    next()
  })
})

router.get('/:id', (req, res, next) => res.json(req.item))

router.post('/', (req, res, next) => {
  Item.create(req.body)
  .then(item => res.json(item))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  req.item.update(req.body)
  .then(item => {
    req.session.cart = req.session.cart.map(sessionItem => (item.id === sessionItem.id ? item : sessionItem))
    res.json(item)
  })
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  req.item.destroy()
  .then(() => res.sendStatus(res.statusCode))
  .catch(next)
})
