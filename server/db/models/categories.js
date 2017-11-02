const Sequelize = require('sequelize')
const db = require('../db')

const Categories = db.define('category', {
  type: Sequelize.STRING
})

module.exports = Categories
