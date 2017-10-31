import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { products, fetchProducts } from '../store'

class ProductList extends Component {

  render() {
    const { products } = this.props
    return (
      <div className="container">
        <br />
        <h2>Shoes</h2>
        <ul className="list-group">
        {
          products &&
          products.map(product =>
            <ProductItem key={product.id} product={product} />
            )
        }
        </ul>
      </div>
      )
  }
}

const mapState = ({ products }) => ({ products })
const mapDispatch = { fetchProducts }

export default connect(mapState, mapDispatch)(ProductList)
