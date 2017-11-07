import React from 'react'
import { connect } from 'react-redux'
import { injectStripe } from 'react-stripe-elements'
import CardSection from './CardSection'
import { Button, Form } from 'antd'

class CheckoutForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.stripe.createToken({type: 'card', name: `${this.props.user.firstName} ${this.props.user.lastName}`});
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

const mapState = ({ user }) => ({ user })

export default injectStripe(connect(mapState)(CheckoutForm))
