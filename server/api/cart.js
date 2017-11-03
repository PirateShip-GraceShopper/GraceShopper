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

router.get('/session', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = []
    console.log('Set the session cart!!!!')
    res.send(req.session.cart)
  } else {
    console.log('Hit the session cart!!!!')
    res.send(req.session.cart)
  }
})


router.post('/', (req, res, next) => {
  Cart.findOrCreate({where: {
    userId: req.body.userId,
    status: 'open'
  }})
  .spread((cart, createdCartBool) => {
    req.session.cart.push(req.body)
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
