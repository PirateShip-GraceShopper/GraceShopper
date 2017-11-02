import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class ProductDetail extends Component {

  constructor (props) {
    super(props)
    //this.onClick function for add to cart
  }

  // onClick() {

  // }

  render () {
    <span>
      <div>

      </div>
    </span>
    <button
      className="btn btn-default"
      //onClick ={_ => clicker}
    >
      <span>Add To Cart</span>
    </button>
  }
}

const mapState = ({ products }) => ({ products })
const mapDispatch = null

export default connect(mapState, mapDispatch)(ProductDetail)
