import React from 'react'
import { CardElement } from 'react-stripe-elements'

const CardSection = _ => (
  <label>
    Card details
    <CardElement style={{ base: { fontSize: '18px' } }} />
  </label>
)

export default CardSection
