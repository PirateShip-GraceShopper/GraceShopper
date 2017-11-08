import React from 'react'
import { connect } from 'react-redux'
import { injectStripe } from 'react-stripe-elements'
import CardSection from './CardSection'
import { Button, Form } from 'antd'
import axios from 'axios'

class CheckoutForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.stripe.createToken({type: 'card', name: `${this.props.user.firstName} ${this.props.user.lastName}`})
    const cartId = this.props.cart[0] ? this.props.cart[0].cartId : Math.floor(Math.random() * 20)
    this.props.sendEmail(event, this.props.user, cartId)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button>Confirm order</button>
      </form>
    )
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.cart
})
const mapDispatch = _ => ({
  sendEmail(evt, user, cartId) {
    evt.preventDefault()
    const email = {
      id: user.key,
      toEmail: user.email,
      name: `Order Confirmation: Order #${cartId *7243} has been placed at Grace-Shoe-Purr`,
      message: `Dear ${user.firstName},
             Thank you for shopping with Grace-Shoe-Purr, the number 1 provider of warmth for all the kitten feet in the world.
             The moment your order ships, you'll receive an email with tracking information. 
             Thank you again for shopping with us. Every pair of kitten mittens you purchase, we donate a pair to a kitten in need.`
    }
    return axios.post('/api/mailer/send', email)
    .then(res => res.data)
    .catch(err => console.error(err))
  }  
})

export default injectStripe(connect(mapState, mapDispatch)(CheckoutForm))
