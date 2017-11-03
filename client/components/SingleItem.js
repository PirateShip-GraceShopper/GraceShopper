import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {changeCartItem} from '../store'

const SingleItem = ({item, changeQuantity}) => {
  const {product, name, price, quantity} = item
  return (
    <div>
      <img src={product && product.image} />
      <h3>{name}</h3>
      <h4>{price}</h4>
      <input
        type="text"
        name="quantity"
        placeholder="quantity"
        onChange={event => changeQuantity(event)}
      />
      <h4>{product && price * quantity}</h4>
    </div>
  )
}

const mapDispatch = dispatch => ({
  changeQuantity(event) {
    dispatch(changeCartItem({quantity: event.target.value}))
  }
})

export default connect(null, mapDispatch)(SingleItem)

SingleItem.PropTypes = {
  item: PropTypes.object
}
