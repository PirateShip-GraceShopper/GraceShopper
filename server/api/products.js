const router = require('express').Router()
const { Product, Review, Item } = require('../db/models')
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
      return null
    })
    .catch(next)
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
  console.log('update review with :', req.body)
  req.product.update(req.body)
    .then(updatedProduct => {
      console.log('after update', updatedProduct)
      res.send(updatedProduct)
    })
    .catch(next)
})
