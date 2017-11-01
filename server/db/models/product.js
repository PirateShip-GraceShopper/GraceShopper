const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER
  },
  inventory: Sequelize.INTEGER,
  image: Sequelize.STRING,
  rating: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5 }
  }
})

module.exports = Product
