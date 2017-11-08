const router = require('express').Router()
const {User, Review} = require('../db/models')
module.exports = router
//some confusion about the data that is being Json-ed when compared to Auther workshop
const mustBeAdmin = (req, res, next) => {
     if (!req.user.isAdmin) {
       next(Error('Unauthorized'))
     } else {
       next()
       return null
     }
   }

const mustBeAdminOrUser = (req, res, next) => {
   if (req.user.isAdmin||(!req.user.isAdmin && req.body.id === req.user.id)){
     next()
   } else {
     next(Error('Unauthorized'))
   }
   return null
 }
router.param('id', (req, res, next, id) => {
  User.findById(id)
  .then(user => {
    if (!user) res.sendStatus(404)
      req.requestedUser = user
      next()
      return null
  })
  .catch(next)
})

router.get('/', mustBeAdmin, (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    include: [{model: Review, as: 'review'}],
    attributes: ['firstName', 'lastName', 'id', 'email', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', mustBeAdmin,(req, res, next) => {
console.log("SFDSf")
  res.json(req.requestedUser)
})

router.post('/', mustBeAdmin, (req, res, next) => {
  User.create(req.body)
  .then(_ => res.sendStatus(201))
  .catch(next)
})

router.put('/:id', mustBeAdminOrUser, (req, res, next) => {
  req.requestedUser.update(req.body)
  .then(user => res.json(user))
  .catch(next);
})

router.delete('/:id', mustBeAdmin, (req, res, next) => {
  req.requestedUser.destroy()
  .then(_ => res.sendStatus(204))
  .catch(next)
})
