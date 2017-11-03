import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { item, postToCart } from '../store'
import SingleItem from './SingleItem'

const Cart = props => {
  return (
    <div>
      <h1>This is a cart</h1>
      { props.cart.map(cartItem =>
        <SingleItem key={cartItem.id} item={cartItem} />)}
    </div>
  )
}

//if there is no items, create a cart on initial add.
//if there is, add to that cart.

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}
const mapDispatch = dispatch => {
  return {
    handleAdd(evt, item, user){
      const cartItem = {
        ...item,
        userId: user.id || null
      }
      dispatch(postToCart(cartItem))
    }
  }
}
export default connect(mapState, mapDispatch)(Cart);
