import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeProduct } from '../store'

const ProductItem = ({ product }) => (
  <li className="list-group-item product-item">
    <Link className="large-font" to={`/products/${product.id}`}>
      <img src={product.image} alt='image' />
      <div>{product.name}</div>
    </Link>
    <button className="btn btn-default btn-xs">
      X <span className="glyphicon glyphicon-remove" />
    </button>
  </li>
)

const mapState = null
const mapDispatch = { removeProduct }

export default connect(mapState, mapDispatch)(ProductItem)
