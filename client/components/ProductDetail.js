import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import ProductItem from './ProductItem'
import Review from './Review'
import ReviewForm from './ReviewForm';

const ProductDetail = ({ products }) => (
  <div>
    {products &&
    <ProductItem product={products} />}
    <h1>Reviews</h1>
    {products && products.review.map(review => {
      return <Review newReview={review} key={review.id} />
    })}
    <br />
    <ReviewForm />
  </div>
)

const mapState = ({ products }, ownProps) => {
  const paramId = Number(ownProps.match.params.id);
  return {
    products: _.find(products, product => product.id === paramId)
  }
}
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ProductDetail);
