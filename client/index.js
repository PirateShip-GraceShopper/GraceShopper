import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {StripeProvider} from 'react-stripe-elements'
import store from './store'
import Routes from './routes'
import 'antd/dist/antd.css'
import './index.scss'
// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey="pk_test_IIfMglC2HysZ4vhpCxD9DsSn">
      <Routes />
    </StripeProvider>
  </Provider>,
  document.getElementById('app')
)
