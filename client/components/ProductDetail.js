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
    console.log(this.props.products);
    return (
      <div>
          <ProductItem product={this.props.products} />
          <div>Reviews</div>
          <button className="btn btn-default">
            <span>Add To Cart</span>
          </button>
      </div>
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
