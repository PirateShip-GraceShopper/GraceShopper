const Sequelize = require('sequelize')
const db = require('../db')


const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('open', 'purchased')
  }
})

module.exports = Cart;