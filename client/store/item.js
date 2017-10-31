import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_ITEMS = 'GET_ALL_ITEMS'
const DELETE_ITEM = 'DELETE_ITEM'
const SUBMIT_ITEM = 'SUBMIT_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'

/**
 * INITIAL STATE
 */
const initialItemState = []

/**
 * ACTION CREATORS
 */
const getAllItems = allItems => ({type: GET_ALL_ITEMS, allItems})
const deleteItem = () => ({type: DELETE_ITEM})
const submitItem = item => ({type: SUBMIT_ITEM, item})
const updateItem = item => ({type: UPDATE_ITEM, item})

/**
 * THUNK CREATORS
 */
export const fetchAllItems = () =>
  dispatch =>
    axios.get(`/api/items`)
      .then(res =>
        dispatch(getAllItems(res.data)))
      .catch(error =>
        dispatch(getAllItems({error})))

export const destroyItem = item =>
  dispatch =>
    axios.delete(`/api/items/${item.id}`)
      .then(_ =>
        dispatch(deleteItem()))
      .catch(error => console.log(error))

export const createItem = item =>
  dispatch =>
    axios.post(`/api/items`, item)
      .then(res =>
        dispatch(submitItem(res.data)))
      .catch(error =>
        dispatch(submitItem({error})))

export const changeItem = item =>
  dispatch =>
    axios.put(`/api/items/${item.id}`)
      .then(res =>
        dispatch(updateItem(res.data)))
      .catch(error =>
        dispatch(updateItem({error})))

/**
 * REDUCER
 */
export default function (state = initialItemState, action) {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return action.allItems
    case DELETE_ITEM:
      return state
    case SUBMIT_ITEM:
      return [...state, action.item]
    case UPDATE_ITEM:
      return state.map(item => (
        item.id !== action.item.id ? item : action.item
      ))
    default:
      return state
  }
}
