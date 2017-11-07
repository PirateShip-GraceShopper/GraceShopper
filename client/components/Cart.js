import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { item, postToCart } from '../store'
import SingleItem from './SingleItem'
import { Button } from "antd";

export const Cart = props => {
  return (
    <div>
      <h1>This is a cart</h1>
      { props.cart.map(cartItem =>
        <SingleItem key={cartItem.id} item={cartItem} />)}
      <h2>Total: {
        props.cart.map(cartItem =>
          cartItem.quantity * cartItem.price)
        .reduce((acc, cur) => acc + cur, 0)
        }
      </h2>
      <Button size="large">Checkout</Button>
    </div>
  )
}


const mapState = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

export default connect(mapState)(Cart);

