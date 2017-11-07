import axios from 'axios'
import history from '../history'

/*
Initial State
*/
const inititalState = []

/**
 * ACTION TYPES
 */
 const ADD_TO_CART = 'ADD_TO_CART'
 const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
 const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'
 const CLEAR_CART = 'CLEAR_CART'
 const SET_SESSION_CART = 'SET_SESSION_CART'

 /**
 * ACTION CREATORS
 */
export const setSessionCart = items => ({type: SET_SESSION_CART, items})
export const addToCart = item => ({type: ADD_TO_CART, item})
export const removeFromCart = item => ({type: REMOVE_FROM_CART, item})
export const updateCartItem = item => ({type: UPDATE_CART_ITEM, item})
export const clearCart = () => ({type: CLEAR_CART})
 /**
 * THUNK CREATORS
 */
export const fetchSessionCart = () =>
  dispatch =>
    axios.get(`/api/cart/session`)
      .then(items =>
        dispatch(setSessionCart(items.data)))
      .catch(error => console.log(error))

export const removeItem = item =>
  dispatch =>
    axios.put(`/api/cart`, item)
      .then(_ => {
        dispatch(removeFromCart(item))
      })
      .catch(error => console.log(error))

export const postToCart = (item) => //item should be object including userId if exists
  dispatch =>
    axios.post('/api/cart', item)
      .then(res =>
        dispatch(addToCart(res.data)))
      .catch(error =>
        dispatch(addToCart({error})))

export const changeCartItem = item =>
dispatch =>
  axios.put(`/api/items/${item.id}`, item)
    .then(res =>
      dispatch(updateCartItem(res.data)))
    .catch(error =>
      dispatch(updateCartItem({error})))

export const checkout = (cart) =>
  dispatch =>
    axios.put(`/api/cart/${cart.id}`)
      .then(_ => dispatch(clearCart()))
      .catch(_ => dispatch(clearCart()))

export const logoutCart = () =>
  dispatch =>
    axios.delete(`/api/cart/session`)
      .then(_ => dispatch(clearCart()))
      .catch(_ => dispatch(clearCart()))

/**
 * REDUCER
 */
 export default function(state = inititalState, action) {
   switch (action.type) {
     case SET_SESSION_CART:
      return action.items
     case ADD_TO_CART:
      return [...state, action.item];
     case REMOVE_FROM_CART:
      return state.filter(item => item.id !== action.item.id);
     case UPDATE_CART_ITEM:
      return state.map(item => (item.id === action.item.id ? action.item : item));
     case CLEAR_CART:
      return inititalState;
     default:
      return state;
   }
 }
