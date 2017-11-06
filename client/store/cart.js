import axios from 'axios'
import history from '../history'

/*
Initial State
*/
const inititalState = [];

/**
 * ACTION TYPES
 */

 const ADD_TO_CART = 'ADD_TO_CART';
 const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
 const UPDATE_ITEM = 'UPDATE_ITEM';
 const CLEAR_CART = 'CLEAR_CART';
 /**
 * ACTION CREATORS
 */
export const addToCart = (item) => ({type: ADD_TO_CART, item});
export const removeFromCart = (item) => ({type: REMOVE_FROM_CART, item});
export const updateItem = (item) => ({type: UPDATE_ITEM, item})
const clearCart = () => ({type: CLEAR_CART});
 /**
 * THUNK CREATORS
 */

export const removeItem = item =>
dispatch =>
  axios.put(`/api/cart`)
    .then(_ =>
      dispatch(removeFromCart(item)))
    .catch(error => console.log(error))

export const postToCart = (item) => //item should be object including userId if exists
  dispatch =>
    axios.post('/api/carts', item)
      .then(res =>
        dispatch(addToCart(res.data)))
      .catch(error =>
        dispatch(addToCart({error})))


export const checkout = (cart) =>
  dispatch =>
    axios.put(`/api/cart/${cart.id}`)
      .then(_ => dispatch(clearCart()))
      .catch(_ => dispatch(clearCart()))



/**
 * REDUCER
 */
 export default function(state = inititalState, action) {
   switch (action.type) {
     case ADD_TO_CART:
      return [...state, action.item];
     case REMOVE_FROM_CART:
      return state.filter(item => item.id !== action.item.id);
     case UPDATE_ITEM:
      return state.map(item => (item.id === action.item.id ? action.item : item));
     case CLEAR_CART:
      return inititalState;
     default:
      return state;
   }
 }
