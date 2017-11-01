import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { products } from '../store'
import ProductItem from './ProductItem'

const ProductList = ({ products }) => (
  <div className="container">
    <h2>Shoes</h2>
    <ul className="list-group">
      {products &&
        products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
    </ul>
  </div>
)

const mapState = ({ products }) => ({ products });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ProductList);
