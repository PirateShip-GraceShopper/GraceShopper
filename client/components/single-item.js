import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const SingleItem = ({price}) => {
  return (
    <div>
      <h2>{price}</h2>
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
