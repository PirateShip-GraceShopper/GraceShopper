import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './product'
<<<<<<< HEAD
import review from './review'
import item from './item'
import users from './users'

const reducer = combineReducers({ user, products, review, item, users })
=======
import reviews from './review'
import item from './item';
import cart from './cart';

const reducer = combineReducers({ user, products, reviews, item, cart })
>>>>>>> master
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
<<<<<<< HEAD
export * from './users'
=======
export * from './cart'
>>>>>>> master
