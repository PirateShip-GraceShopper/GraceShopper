const router = require('express').Router()
const { Item, Cart } = require('../db/models')
module.exports = router;


router.param('id', (req, res, next, id) => {
  Cart.findById(id)
    .then(cart => {
      req.cart = cart;
      next()
    return null
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  Cart.findAll()
  .then(carts => res.json(carts))
  .catch(next)
})

router.get('/session', (req, res, next) => {
  if (req.user) {
    Cart.findOne({where: {
      userId: req.user.id,
      status: 'open'
    }})
    .then(foundCart => {
      if (foundCart) req.session.cart = foundCart.item
      res.send(req.session.cart)
    })
    .catch(next)
  } else {
    res.send(req.session.cart)
  }
})

router.delete('/session', (req, res, next) => {
  req.session.cart = []
  res.send(req.session.cart)
})

router.post('/', (req, res, next) => {
  if (req.body.userId) {
    Cart.findOrCreate({where: {
      userId: req.body.userId,
      status: 'open'
    }})
    .spread((cart, createdCartBool) => {
      return Item.create(req.body)
      .then(item => item.setCart(cart))
    })
    .then(item => {
      req.session.cart.push(item)
      res.json(item)
    })
    .catch(next)
  } else if (!req.body.cartId) {
    Cart.create({
      userId: null,
      status: 'open'
    })
    .then(cart => {
      return Item.create(req.body)
      .then(item => item.setCart(cart))
    })
    .then(item => {
      req.session.cart.push(item)
      res.json(item)
    })
    .catch(next)
  } else {
    Cart.findById(req.body.cartId)
    .then(cart => {
      return Item.create(req.body)
      .then(item => item.setCart(cart))
    })
    .then(item => {
      req.session.cart.push(item)
      res.json(item)
    })
    .catch(next)
  }
})

router.put('/', (req, res, next) => {
  req.session.cart = req.session.cart.filter(sessionItem => (sessionItem.id !== req.body.id))
  Item.destroy({where: {id: req.body.id}})
    .then(deletedRows => {
      deletedRows ? res.status(200).send('Item was deleted') :
      res.sendStatus(204)
    })
})


router.put('/:id', (req, res, next) => {
  req.cart.update(req.body)
    .then(order => {
      res.json(order)
    })
})


router.get('/user/:userId', (req, res, next) => {
  Cart.findAll({where: {userId: +req.params.userId, status: 'purchased'}})
    .then(carts => {
      let cartIds = carts.map(cart => cart.id)
      Item.findAll()
        .then(items => {
          let newItems = items.filter(item => {
            return cartIds.indexOf(item.cartId) > -1
          })
          res.json(newItems)
        })

    })
})
