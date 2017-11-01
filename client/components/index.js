/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {default as SingleItem} from './single-item'
export {default as AllItems} from './all-items'
export {Login, Signup} from './auth-form'
export {default as ProductList} from './productlist'
export {default as SingleUser} from './SingleUser'
export {default as ProductDetail} from './ProductDetail'

