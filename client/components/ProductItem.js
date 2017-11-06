import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postToCart } from '../store'
import Stars from './ReviewStars'
import { Button, Rate, Carousel } from 'antd'


const ProductItem = ({ product, postToCart, user }) => (
  <li className="list-group-item product-item">
    <Link className="large-font" to={`/products/${product.id}`}>
      <Carousel effect="fade">
        <img className='pictures' src={product.image} alt={product.name} />
      </Carousel>
      <span>{product.name}</span>
      <br />
      <span>{product.price}</span>
      <br />
      <Rate allowHalf />
    </Link>
    <br />
    <Button
      type="primary"
      onClick={() => postToCart(
        { price: product.price,
          quantity: 1,
          productId: product.id,
          image: product.image,
          name: product.name,
          userId: user.id ? user.id : null
        }
      )}
    >Add To Cart</Button>
    <br />
    <Button type="danger">Remove Product</Button>
  </li>
)

const mapState = state => ({
  user: state.user
})
const mapDispatch = { postToCart }

export default connect(mapState, mapDispatch)(ProductItem)
