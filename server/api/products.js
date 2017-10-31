const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

router.param('id', (req, res, next, id) => {
  Product.findById(id)
    .then(product => {
      if (!product) res.sendStatus(404)
      req.product = product
      next()
    })
})

router.get('/:id', (req, res, next) => res.json(req.product))

router.post('/', (req, res, next) => {
  Product.findOrCreate({ where: req.body })
    .spread(product => res.json(product))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  req.product.destroy()
    .then(_ => res.sendStatus(res.statusCode))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  req.product.update(req.body)
    .then(_ => res.sendStatus(res.statusCode))
    .catch(next)
})