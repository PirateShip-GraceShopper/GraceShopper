import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeProduct } from '../store'
import Stars from './ReviewStars'

const ProductItem = ({ product }) => (
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
    <button className="btn btn-default">
      <div>Add To Cart</div>
    </button>
    <br />
    <button className="btn btn-default btn-xs">
      Remove Product <span className="glyphicon glyphicon-remove" />
    </button>
  </li>
)

const mapState = null
const mapDispatch = { removeProduct }

export default connect(mapState, mapDispatch)(ProductItem)
