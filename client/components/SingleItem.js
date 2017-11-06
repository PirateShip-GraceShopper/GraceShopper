import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {changeCartItem, removeItem} from '../store'

const SingleItem = ({item, changeQuantity, handleRemove}) => {
  const {image, name, price, quantity} = item
  return (
    <div>
      <img src={image} />
      <h3>{name}</h3>
      <h4>{price}</h4>
      <input
        type="text"
        name="quantity"
        placeholder="quantity"
        onChange={event => changeQuantity(event, item)}
      />
      <h4>{price * quantity}</h4>
      <button
        onClick={() => handleRemove(item)}
      >Remove Item</button>
    </div>
  )
}

const mapDispatch = dispatch => ({
  changeQuantity(event, item) {
    dispatch(changeCartItem({
      id: item.id,
      quantity: +event.target.value
    }))
  },
  handleRemove(item) {
    dispatch(removeItem({
      id: item.id
    }))
  }
})

export default connect(null, mapDispatch)(SingleItem)

SingleItem.PropTypes = {
  item: PropTypes.object
}
