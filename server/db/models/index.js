const User = require('./user')
const Item = require('./item')
const Product = require('./product')
const Address = require('./address')
const Review =  require('./review')
const Cart = require('./cart')
const Categories = require('./categories')

/******************** ASSOCIATIONS *********************/
//User
User.belongsTo(Address)

//Cart
User.hasMany(Cart, {as: 'cart'})

//Reviews
Product.hasMany(Review, {as: 'review'})
User.hasMany(Review, {as: 'review'})

//Item
Product.hasMany(Item, {as: 'item'})
Cart.hasMany(Item, {as: 'item'})

//Product
Categories.hasMany(Product, {as: 'products', constraints: false})
// Product.belongsTo(Categories, {as: 'categories'})

Categories.belongsToMany(Product, { through: 'ProductCategories' })
Product.belongsToMany(Categories, { through: 'ProductCategories' })

Item.belongsTo(Cart);


module.exports = {
  User,
  Item,
  Product,
  Address,
  Review,
  Cart,
  Categories
}
