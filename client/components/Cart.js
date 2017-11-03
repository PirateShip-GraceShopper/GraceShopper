import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { item } from '../store';
import { postToCart } from '../store/cart'

const Cart = (props) => {
  return (
    <div>
      <h1>This is a cart</h1>s
      <ul>
        <div className="product-info-div">This is where the product info would go</div>
        <div className="product-price-div">Price</div>
        <div className="product-quantity-div">
        <select>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
            return (
              <option key={num} value={num}>{num}</option>
            )
          })}
        </select>
        <button>Delete</button>
        </div>
      </ul>
    </div>
  )
}

//if there is no items, create a cart on initial add.
//if there is, add to that cart.

const mapState = (state)=>{
  return {
    user:state.user
  }
}
const mapDispatch = (dispatch)=>{
  return {
    handleAdd(evt, item, user){
      const cartItem = {
        // ...item,
        userId: user.id || null
      }
      dispatch(postToCart(cartItem))
    }
  }
}
export default Cart;
