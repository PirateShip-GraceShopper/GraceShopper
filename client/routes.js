import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, SingleUser, SingleItem, AllItems, ProductList, ReviewList, Cart, ProductDetail} from './components'
import {me, fetchProducts, fetchAllItems, fetchReviewsThunk} from './store'




/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={ProductList} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={ProductList} />
            <Route path="/products/:id" component={ProductDetail} />
            <Route path="/all-items" component={AllItems} />
            <Route path="/all-reviews" component={ReviewList} />
            <Route path="/cart" component={Cart} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={ProductList} />
                  <Route path="/edit_profile" component={SingleUser}/>
                  <Route path="/products" component={ProductList} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={ProductList} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchProducts())
      dispatch(fetchAllItems())
      dispatch(fetchReviewsThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
