import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import ProductItem from './ProductItem'

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    //this.onClick function for add to cart
  }

  // onClick() {

  // }

  render() {
    const { products } = this.props
    return (
      <span>
        <ProductItem product={products} />
        <div>
          TEST TEXT
        </div>
      </span>
    );
  }
}

const mapState = ({ products }, ownProps) => {
  const paramId = Number(ownProps.match.params.id);
  return {
    products: _.find(products, product => product.id === paramId)
  };
};
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ProductDetail);
