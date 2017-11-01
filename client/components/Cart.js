import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { item } from '../store';

const Cart = (props) => {
  return (
    <div>
      <h1>This is a cart</h1>
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


export default Cart;
