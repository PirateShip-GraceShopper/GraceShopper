const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  User.findOne({
    where: {id: req.params.userId},
    attributes: ['id', 'email']
  })
    .then(user => res.json(user))
    .catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(next)
})

router.put('/:userId', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    user.update(req.body)
  })
  .then(user => res.json(user))
  .catch(next)
})

router.delete('/:userId', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => user.destory())
  .catch(next)
})