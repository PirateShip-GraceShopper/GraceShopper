import axios from 'axios'

const INITIALIZE = `INITIALIZE_PRODUCTS`
const CREATE = `CREATE_PRODUCT`
const UPDATE = `UPDATE_PRODUCT`
const REMOVE = `REMOVE_PRODUCT`

const init = products => ({ type: INITIALIZE, products })
const create = product => ({ type: CREATE, product })
const update = product => ({ type: UPDATE, product })
const remove = id => ({ type: REMOVE, id})

export const fetchProducts = _ => dispatch => {
  axios.get(`/api/products`)
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error(`Fetching products unsuccessful`, err))
}

export const addProducts = product => dispatch => {
  axios.post(`/api/products`, product)
    .then(res => dispatch(create(res.data)))
    .catch(err => console.error(`Creating product: ${product} unsuccessful`, err))
}

export const removeProduct = id => dispatch => {
  dispatch(remove(id))
  axios.delete(`/api/products/${id}`)
    .catch(err => console.error(`Removing product: ${id} unsuccessful`, err))
}

export default const reducer = (products = [], action) => {
  switch (action.type) {
    case INITIALIZE:
      return action.products
    case CREATE:
      return [action.product, ...products]
    case REMOVE:
      return products.filter(product => product.id !== action.id)
    default:
      return products
  }
}
