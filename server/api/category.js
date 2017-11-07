const router = require('express').Router()
const { Categories } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Categories.findAll({
    include: [{ model: Review, as: 'review' }]
  })
    .then(category => res.json(category))
    .catch(next)
})

router.param('id', (req, res, next, id) => {
  Categories.findById(id)
    .then(category => {
      if (!category) res.sendStatus(404)
      req.category = category
      next()
      return null
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => res.json(req.category))

router.post('/', (req, res, next) => {
  Categories.findOrCreate({ where: req.body })
    .spread(category => res.json(category))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  req.Categories.destroy()
    .then(_ => res.sendStatus(res.statusCode))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  req.Categories.update(req.body)
    .then(_ => res.sendStatus(res.statusCode))
    .catch(next)
})
