import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const DELETE_ORDER = 'DELETE_ORDER'
const SUBMIT_ORDER = 'SUBMIT_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

/**
 * INITIAL STATE
 */
const initialOrderState = []

/**
 * ACTION CREATORS
 */
const getAllOrders = allOrders => ({type: GET_ALL_ORDERS, allOrders})
const deleteOrder = () => ({type: DELETE_ORDER})
const submitOrder = order => ({type: SUBMIT_ORDER, order})
const updateOrder = order => ({type: UPDATE_ORDER, order})

/**
 * THUNK CREATORS
 */
export const fetchAllOrders = () =>
  dispatch =>
    axios.get(`/api/orders`)
      .then(res =>
        dispatch(getAllOrders(res.data)))
      .catch(error =>
        dispatch(getAllOrders({error})))

export const destroyOrder = order =>
  dispatch =>
    axios.delete(`/api/orders/${order.id}`)
      .then(_ =>
        dispatch(deleteOrder()))
      .catch(error => console.log(error))

export const createOrder = order =>
  dispatch =>
    axios.post(`/api/orders`, order)
      .then(res =>
        dispatch(submitOrder(res.data)))
      .catch(error =>
        dispatch(submitOrder({error})))

export const changeOrder = order =>
  dispatch =>
    axios.put(`/api/orders/${order.id}`)
      .then(res =>
        dispatch(updateOrder(res.data)))
      .catch(error =>
        dispatch(updateOrder({error})))

/**
 * REDUCER
 */
export default function (state = initialOrderState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders
    case DELETE_ORDER:
      return state
    case SUBMIT_ORDER:
      return [...state, action.order]
    case UPDATE_ORDER:
      return state.map(order => (
        order.id !== action.order.id ? order : action.order
      ))
    default:
      return state
  }
}
