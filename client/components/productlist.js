import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { products } from '../store'
import ProductItem from './ProductItem'
import { Row, Col } from 'antd'

const ProductList = ({ products }) => (
  <div className="container">
    <h2>Shoes</h2>
    <ul className="list-group">
      <Row>
      {products &&
        products.map(product => (
          <Col span={12} key={product.id} className="pictures">
            <ProductItem product={product} />
          </Col>
        ))}
        </Row>
    </ul>
  </div>
)

const mapState = ({ products }) => ({ products })
const mapDispatch = null

export default connect(mapState, mapDispatch)(ProductList)
