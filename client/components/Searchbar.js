import React from 'react'
import { connect } from 'react-redux'
import { AutoComplete } from 'antd'
import history from '../history'

const Searchbar = ({ products }) => {
  const dataSource = []
  products.forEach(product => dataSource.push(product.name))

  return (
    <AutoComplete
      style={{ width: 200 }}
      dataSource={dataSource}
      placeholder="Search by name"
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      onSelect={value => {
        products.forEach(product => {
          if (product.name === value) history.push(`/products/${product.id}`)
        })
      }}
    />
  )
}

const mapState = ({ products }) => ({ products })
const mapDispatch = null

export default connect(mapState, mapDispatch)(Searchbar)
