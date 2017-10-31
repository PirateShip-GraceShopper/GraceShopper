import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const SingleItem = props => {
  return (
    <div>
      <h1>Single Item</h1>
    </div>
  )
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
