const Sequelize = require('sequelize')
const db = require('../db')
const Item = require('./item')


const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('open', 'purchased', 'shipped')
  }
}, {
  defaultScope: {
    include: [ {model: Item, as: 'item' }]
  }
})

module.exports = Cart;
