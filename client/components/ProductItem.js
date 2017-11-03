import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postToCart } from '../store'
import Stars from './ReviewStars'

const ProductItem = ({ product, postToCart, user }) => (
  <li className="list-group-item product-item">
    <Link className="large-font" to={`/products/${product.id}`}>
      <img src={product.image} alt={product.name} />
      <span>{product.name}</span>
      <br />
      <span>{product.price}</span>
      <br />
      <Stars />
    </Link>
    <br />
    <button
      className="btn btn-default"
      onClick={() => postToCart(
        { price: product.price,
          quantity: 1,
          productId: product.id,
          image: product.image,
          name: product.name,
          userId: user.id ? user.id : null
        }
      )}
    >
      <div>Add To Cart</div>
    </button>
    <br />
    <button className="btn btn-default btn-xs">
      Remove Product <span className="glyphicon glyphicon-remove" />
    </button>
  </li>
)

const mapState = state => ({
  user: state.user
})
const mapDispatch = { postToCart }

export default connect(mapState, mapDispatch)(ProductItem)
