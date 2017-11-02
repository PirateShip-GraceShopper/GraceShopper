import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import ProductItem from './ProductItem'

const ProductDetail = ({ products }) => (
  <div>
    <ProductItem product={products} />
    <div>Reviews go here</div>
  </div>
)

const mapState = ({ products }, ownProps) => {
  const paramId = Number(ownProps.match.params.id)
  return {
    products: _.find(products, product => product.id === paramId)
  };
};

export default connect(mapState, _)(ProductDetail)
