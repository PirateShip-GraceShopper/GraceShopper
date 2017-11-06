import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd';

const CartIcon = ({ cart }) => {
  return (
    <div>
    <Link to="/cart" style={{color: 'white'}}>
    <Icon type="shopping-cart"  style={{ fontSize: 25 }} />
    {cart.length}
    </Link>
    </div>
  )
}


export default CartIcon;
