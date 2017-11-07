import axios from 'axios'

const INITIALIZE = `INITIALIZE_CATEGORIES`
const CREATE = `CREATE_CATEGORY`
const UPDATE = `UPDATE_CATEGORY`
const REMOVE = `REMOVE_CATEGORY`

const init = categories => ({ type: INITIALIZE, categories })
const create = category => ({ type: CREATE, category })
const update = category => ({ type: UPDATE, category })
const remove = category => ({ type: REMOVE, category })

export const fetchCategories = _ => dispatch => {
  axios.get(`/api/categories`)
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error(`Fetching categories unsuccessful`, err))
}

export const addCategory = category => dispatch => {
  axios.post(`/api/categories`, category)
    .then(res => dispatch(create(res.data)))
    .catch(err => console.error(`Creating category: ${category} unsuccessful`, err))
}

export const removeCategory = category => dispatch => {
  dispatch(remove(category))
  axios.delete(`/api/categories/${category.id}`)
    .catch(err => console.error(`Removing category: ${category.id} unsuccessful`, err))
}

export default function (categories = [], action) {
  switch (action.type) {
    case INITIALIZE:
      return action.categories
    case CREATE:
      return [action.categories, ...categories]
    case REMOVE:
      return categories.filter(category => category.id !== action.category.id)
    default:
      return categories
  }
}
