import React, {Component} from 'react'
import { Table } from 'antd';
import {connect} from 'react-redux'
import store, { fetchOrders, getOrders } from '../store'

const columns = [{
  title: 'Order ID',
  dataIndex: 'orderid',
}, {
  title: 'Amount',
  dataIndex: 'amount',
}];

class PastOrders extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllOrders(this.props.user)
  }

  render() {
  return (

      <div>
      <h1>Past Orders</h1>
      {this.props.orders.length ?
      <Table columns={columns} dataSource={this.props.orders} size="middle" />
      : <h1>No Past Orders</h1>}
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
