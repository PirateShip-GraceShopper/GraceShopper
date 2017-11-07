import axios from 'axios'
import history from '../history'

/*
Initial State
*/
const inititalState = null

/**
 * ACTION TYPES
 */
 const ADD_CARTID = 'ADD_CARTID'
 const REMOVE_CARTID = 'REMOVE_CARTID'

 /**
 * ACTION CREATORS
 */
export const addCartId = cartId => ({type: ADD_CARTID, cartId})
export const removeCartId = () => ({type: REMOVE_CARTID})

export default function(state = inititalState, action) {
  switch (action.type) {
    case ADD_CARTID:
     return action.cartId
    case REMOVE_CARTID:
     return null
    default:
     return state
  }
}
