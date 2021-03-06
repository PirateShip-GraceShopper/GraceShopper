import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './product'
import review from './review'
import item from './item'
import users from './users'
import cart from './cart';
import categories from './category'
import cartId from './cartId'
import orders from './orders'

const reducer = combineReducers({ user, products, review, item, cart, users, categories, cartId, orders })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './item'
export * from './review'
export * from './users'
export * from './cart'
export * from './category'
export * from './cartId'
export * from './orders'

