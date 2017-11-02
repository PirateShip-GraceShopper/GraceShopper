const User = require('./user')
const Item = require('./item')
const Product = require('./product')
const Address = require('./address')
const Review =  require('./review')
const Cart = require('./cart')

/******************** ASSOCIATIONS *********************/
//User
Address.belongsTo(User, {as: 'user'})

//Cart
User.hasMany(Cart, {as: 'cart'})

//Reviews
Product.hasMany(Review, {as: 'review'})
User.hasMany(Review, {as: 'review'})

//Item
Product.hasMany(Item, {as: 'item'})
// Cart.hasMany(Item, {as: 'item'})
Item.belongsTo(Cart)
module.exports = {
  User,
  Item,
  Product,
  Address,
  Review,
  Cart
}
