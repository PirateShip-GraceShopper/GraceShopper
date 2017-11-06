import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { cart } from '../store';
import { Icon } from 'antd';

const CartIcon = ({ cart }) => {
  console.log(cart)
  return (
    <div>
    <Icon type="shopping-cart" />
    </div>
  )
}


export default CartIcon;
