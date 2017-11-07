import React from 'react'
import { connect } from 'react-redux'
import { AutoComplete } from 'antd'
import history from '../history'

const Searchbar = ({ products, categories }) => {
  const dataSource = []
  products.forEach(product => dataSource.push(product.name))
  console.log(categories)

  return (
    <AutoComplete
      style={{ width: 200 }}
      dataSource={dataSource}
      placeholder="Search by name or category"
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      onSelect={value => {
        products.forEach(product => {
          if (product.name === value) history.push(`/products/${product.id}`)
        })
      }}
    />
  )
}

const mapState = ({ products, categories }) => ({ products, categories })
const mapDispatch = null

export default connect(mapState, mapDispatch)(Searchbar)
