import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SingleItem from './single-item'

const AllItems = ({item}) => {
  return (
    <div>
      <h1>All Items</h1>
      <div>
        { item.map(singleItem =>
          <SingleItem key={singleItem.id} price={singleItem.price} />)}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    item: state.item
  }
}

export default connect(mapState)(AllItems)

AllItems.PropTypes = {
  item: PropTypes.object
}
