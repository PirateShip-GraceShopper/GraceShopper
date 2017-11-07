const Sequelize = require('sequelize')
const db = require('../db')
const Review = require('./review')

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
  image: Sequelize.STRING
},
  {
    defaultScope: {
      include: [ {model: Review, as: 'review'} ]
    }
  })

module.exports = Product
