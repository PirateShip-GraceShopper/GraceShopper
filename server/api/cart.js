const router = require('express').Router()
const { Item, Cart } = require('../db/models')
module.exports = router;


router.param('id', (req, res, next, id) => {
  Cart.findById(id)
    .then(cart => {
      req.cart = cart;
    next();
    })
})

router.get('/', (req, res, next) => {
  Cart.findAll()
  .then(carts => res.json(carts))
  .catch(next)
})


router.post('/', (req, res, next) => {
  Cart.findOrCreate({where: {
    userId: req.body.userId,
    status: 'open'
  }})
  .spread((cart, createdCartBool) => {
    return Item.create(req.body)
    .then(item => item.setCart(cart))
  })
  .then(item => res.json(item))
  .catch(next)
})

router.put('/', (req, res, next) => {
  Item.destroy({where: {id: req.body.id}})
    .then(deletedRows => {
      deletedRows ? res.status(200).send('Item was deleted') :
      res.sendStatus(204)
    })
})


router.put('/:id', (req, res, next) => {
  req.cart.update({status: 'purchased'})
    .then(order => {
      res.json(order)
    })
})
