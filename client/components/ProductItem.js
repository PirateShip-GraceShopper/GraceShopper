import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postToCart, removeProduct  } from '../store'
import Stars from './ReviewStars'
import { Button, Rate, Carousel } from 'antd'


const ProductItem = ({ product, user, postToCart, deleteProduct }) => {
    let total = 0;
    product.review.map(review => {
      total += review.rating;
    })
    const averageRating =  total / product.review.length
    return (
    <li className="list-group-item product-item">
      <Link className="large-font" to={`/products/${product.id}`}>
        <Carousel effect="fade">
          <img src={product.image} alt={product.name} style={{ height: '400px', width: '450px' }} />
        </Carousel>
        <span>{product.name}</span>
        <br />
        <span>{product.price}</span>
        <br />
        {
          product.inventory ?
          <span>{product.inventory} available</span> :
          <span> Sold Out</span>
        }
        <br />
        <Rate
          allowHalf
          value={averageRating}
          disabled={true}
        />
      </Link>
      <br />
      {product.inventory ?
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
      >Add To Cart</Button> :
      <Button disabled>Add To Cart</Button>}
      <br />
      <Button onClick={() => deleteProduct(product)} type="danger">Remove Product</Button>
    </li>
    )
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = { postToCart, deleteProduct: removeProduct }

export default connect(mapState, mapDispatch)(ProductItem)
