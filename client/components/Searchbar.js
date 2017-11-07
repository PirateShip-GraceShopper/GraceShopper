import React from 'react'
import { connect } from 'react-redux'
import { AutoComplete } from 'antd'

const Searchbar = ({ products, categories }) => {
  const dataSource = []
  products.forEach(product => dataSource.push(product.name))
  categories.forEach(category => dataSource.push(category))

  return (
    <AutoComplete
      style={{ width: 200 }}
      dataSource={dataSource}
      placeholder="Search by name or category"
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      onSelect={() => {*/somthing going dwn */}}
    />
  )
}

const mapState = ({ products, categories }) => ({ products, categories })
const mapDispatch = null

export default connect(mapState, mapDispatch)(Searchbar)
