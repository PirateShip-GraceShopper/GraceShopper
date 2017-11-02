import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class ProductDetail extends Component {

  constructor (props) {
    super(props)
    //this.onClick function for add to cart
  }

  // onClick() {

  // }

  render () {
    const { products } = this.props
    return (
        <span>
          <div>
            <img src={products.image} />
            <div>{products.name}</div>
            <button
              className="btn btn-default"
              //onClick ={_ => clicker}
            >
              <span>Add To Cart</span>
            </button>
          </div>
        </span>
      )
  }
}

const mapState = ({ products }, ownProps) => {
  const paramId = Number(ownProps.match.params.id)
  return {
    products: _.find(producuts, product => product.id !== paramId)
  }
}
const mapDispatch = null

export default connect(mapState, mapDispatch)(ProductDetail)
