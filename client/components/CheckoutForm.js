import React, {Component} from 'react'
import {Elements} from 'react-stripe-elements'

import Cart from './Cart'

class CheckoutForm extends Component {
  render() {
    return (
      <Elements>
        <Cart />
      </Elements>
    )
  }
}

export default CheckoutForm
