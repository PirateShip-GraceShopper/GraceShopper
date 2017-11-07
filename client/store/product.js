import axios from 'axios'

const INITIALIZE = `INITIALIZE_PRODUCTS`
const CREATE = `CREATE_PRODUCT`
const UPDATE = `UPDATE_PRODUCT`
const REMOVE = `REMOVE_PRODUCT`

const init = products => ({ type: INITIALIZE, products })
const create = product => ({ type: CREATE, product })
const update = product => ({ type: UPDATE, product })
const remove = product => ({ type: REMOVE, product})

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

export const removeProduct = product => dispatch => {
  dispatch(remove(product))
  axios.delete(`/api/products/${product.id}`)
    .catch(err => console.error(`Removing product: ${product.id} unsuccessful`, err))
}

export const updateProduct = product => dispatch => {
  axios.put(`/api/products/${product.id}`, product)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.log(err))
}

export default function (products = [], action) {
  switch (action.type) {
    case INITIALIZE:
      return action.products
    case CREATE:
      return [action.product, ...products]
    case REMOVE:
      return products.filter(product => product.id !== action.product.id)
    case UPDATE:
      return products.map(product => (product.id === action.product.id ? action.product : product))
    default:
      return products
  }
}
