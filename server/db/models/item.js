const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Item
