import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SingleItem from './SingleItem'

const AllItems = ({item}) => {
  return (
    <div>
      <h1>All Items</h1>
      <div>
        { item.map(singleItem =>
          <SingleItem key={singleItem.id} item={singleItem} />)}
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
