import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'
const EDIT_USER = 'EDIT_USER'
/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */

const getUsers = users => ({ type: GET_USERS, users })
const deleteUser = userId => ({ type: DELETE_USER, userId })
const editUser = user => ({ type: EDIT_USER, user })
/**
 * THUNK CREATORS
 */
export const fetchUsers = () =>
  dispatch =>
    axios.get('/api/users')
      .then(res =>
        dispatch(getUsers(res.data)))
      .catch(err => console.log(err))

export const deleteUserThunk = (userId) => (
  dispatch => {
    dispatch(deleteUser(userId))
    axios.delete(`/api/users/${userId}`)
      .catch(err => console.err(`Deleting user with ID ${userId} was unsuccessful`, err))
  }
)
export const makeToAdmin = user => (
  dispatch => {
    axios.put(`/api/users/${user.id}`, user)
      .then(res => dispatch(editUser(res.data)))
      .catch(err => console.error(err))
  })

/**
 * REDUCER
 */
export default function (state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case DELETE_USER:
      return state.filter(user => (+user.id !== +action.userId))
    case EDIT_USER:
      return state.map(user => ((user.id === action.user.id) ? action.user : user))
    default:
      return state
  }
}
