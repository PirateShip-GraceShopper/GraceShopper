import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class SingleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0
    }
    this.updateTotal = this.updateTotal.bind(this)
  }
  updateTotal(event) {
    this.setState({total: this.props.item.price * event.target.value})
  }
  render() {
    const {product, name, price} = this.props.item
    return (
      <div>
        <img src={product.images[0]} />
        <h3>{name}</h3>
        <h4>{price}</h4>
        <input
          type="text"
          name="quantity"
          placeholder="quantity"
          onChange={(event) => this.updateTotal(event)}
        />
        <h4>{this.state.total}</h4>
      </div>
    )
  }
}

const mapState = state => {
  return {
    item: state.item
  }
}

export default connect(mapState)(SingleItem)

SingleItem.PropTypes = {
  item: PropTypes.object
}
