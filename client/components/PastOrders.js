import React, {Component} from 'react'
import { Table } from 'antd';
import {connect} from 'react-redux'
import { fetchOrders } from '../store'

const columns = [{
  title: 'Order Id',
  dataIndex: 'orderid',
}, {
  title: 'Amount',
  dataIndex: 'amount',
}];

class PastOrders extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    this.props.getAllOrders(this.props.user)
  }

  render() {
    let carts = {}
    this.props.orders.forEach(lineItem => {
      if (!carts[lineItem.cartId]) {
        carts[lineItem.cartId] = 0;
        carts[lineItem.cartId] += (lineItem.price * lineItem.quantity)
      }
      else {
        carts[lineItem.cartId] += (lineItem.price * lineItem.quantity)
      }
    })
    const data = []
    if (Object.keys(carts).length) {
      let key = 0;
      for (let cartId in carts) {
         data.push({key: key++, orderid: cartId, amount: carts[cartId]})
      }
    }
  return (

      <div>
      <h1>Past Orders</h1>
      {this.props.orders.length ? <h4>No Past Orders</h4> :
      <Table columns={columns} dataSource={this.state.data} size="middle" />
      }

    </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrders(user) {
      dispatch(fetchOrders(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PastOrders)
