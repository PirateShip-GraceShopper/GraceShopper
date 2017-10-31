import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeProduct } from '../store'

const ProductItem = ({ product }) => {
    // authorization passed in as a prop
    return (
      <li className="list-group-item product-item">
        <Link className="large-font" to={`/products/${product.id}`}>
          <img src={product.photo} />
          <span>{product.title}</span>
        </Link>
        <button
          className="btn btn-default btn-xs"
        >
          X <span className="glyphicon glyphicon-remove" />
        </button>
      </li>
    )
  }
}

const mapState = ({ product }) => ({ product })
const mapDispatch = { removeProduct }

export default connect(mapState, mapDispatch)(ProductItem)
