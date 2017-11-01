const router = require('express').Router()
const { Item } = require('../db/models')
module.exports = router;


router.param('id', (req, res, next, id) => {
  Cart.findById(id)
    .then(cart => {
    res.json(cart);
    })
})


router.post('/', (req, res, next) => {
  Cart.findOrCreate();
})

