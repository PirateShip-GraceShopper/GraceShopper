import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { products, fetchProducts } from '../store'

class ProductList extends Component {

  render() {
    const { products } = this.props
    return (
      <div>
        <h2>Shoes</h2>
        {
          // commment
        }
      </div>
      )
  }
}

const mapState = ({ products }) => ({ products })
const mapDispatch = { fetchProducts }

export default connect(mapState, mapDispatch)(ProductList)
