import React from 'react'
import { Elements } from 'react-stripe-elements'
import Cart from './Cart'

const CheckoutForm = _ => (
  <Elements>
    <Cart />
  </Elements>
)

export default CheckoutForm
