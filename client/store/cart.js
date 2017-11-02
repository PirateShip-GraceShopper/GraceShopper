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
 /**
 * ACTION CREATORS
 */
const addToCart = (item) => ({type: ADD_TO_CART, item});
const removeFromCart = (item) => ({type: REMOVE_FROM_CART, item});
const updateItem = (item) => ({type: UPDATE_ITEM, item})
 /**
 * THUNK CREATORS
 */


export const postToCart = (item, cart) => //item should be object including userId if exists
  dispatch =>
    axios.post('/api/carts/', item)
      .then(res =>
        dispatch(addToCart(res.data)))
      .catch(error =>
        dispatch(addToCart({error})))

/**
 * REDUCER
 */

 export default function(state = inititalState, action) {
   switch(action.type) {
     case ADD_TO_CART:
      return [...state, action.item];
     case REMOVE_FROM_CART:
      return state.filter(item => item.id !== action.item.id);
     case UPDATE_ITEM:
      return state.map(item => (item.id === action.item.id ? action.item : item));
     default:
      return state;
   }
 }
