import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const AllItems = props => {
  return (
    <div>
      <h1>All Items</h1>
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
