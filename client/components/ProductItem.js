import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeProduct } from '../store'
import Stars from './ReviewStars'
import { Button, Rate, Carousel } from 'antd'


const ProductItem = ({ product }) => {
    let total = 0; 
    product.review.map(review => {
      total += review.rating;
    })
    const averageRating =  total / product.review.length
    return (
    <li className="list-group-item product-item">
      <Link className="large-font" to={`/products/${product.id}`}>
        <Carousel effect="fade">
          <img className='pictures' src={product.image} alt={product.name} />
        </Carousel>
        <span>{product.name}</span>
        <br />
        <span>{product.price}</span>
        <br />
        <Rate
          allowHalf
          value={averageRating}
          disabled={true}
        />
      </Link>
      <br />
      <Button type="primary">Add To Cart</Button>
      <br />
      <Button type="danger">Remove Product</Button>
    </li>
    )
}

const mapState = null
const mapDispatch = { removeProduct }

export default connect(mapState, mapDispatch)(ProductItem)
