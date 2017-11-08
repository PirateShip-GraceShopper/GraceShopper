import axios from 'axios'
import history from '../history'

const initialState = []


const GET_ORDERS = 'GET_ORDERS'

export const getOrders = orders => ({type: GET_ORDERS, orders})

export const fetchOrders = (user) =>
dispatch =>
  axios.get(`/api/cart/user/${user.id}`)
    .then(res =>
      dispatch(getOrders(res.data)))
    .catch(error => console.log(error))

export default function(state = initialState, action) {
  switch (action.type) {
   case GET_ORDERS:
    return action.orders
    default:
     return state;
  }
}
