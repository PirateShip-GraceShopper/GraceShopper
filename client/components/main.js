import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import { Button, Layout, Menu } from 'antd'
const { Header, Footer, Content } = Layout
import { CartIcon } from '../components'
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = ({ children, handleClick, isLoggedIn, isAdmin, cart }) => (
  <Layout>
    <Header style={{ width: '100%' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
          <Menu.Item key="home">
            <Link to={'/'}><h1 style={{ color: '#fff' }}>Grace Shoe-Purr</h1></Link>
          </Menu.Item>
          {
            isLoggedIn
              ? <Menu.Item>
                {/* The navbar will show these links after you log in */}
                <Button>
                  <Link to={`/edit_profile`}>Edit Profile</Link>
                </Button>
                <Button>
                  <a href="#" onClick={handleClick}>Logout</a>
                </Button>
                {
                  isAdmin &&
                  <Button><Link to={`/all_users`}>Manage Users</Link></Button>
                }
              </Menu.Item>
              : <Menu.Item>
                {/* The navbar will show these links before you log in */}
                <Button ghost>
                  <Link to="/login">Login</Link>
                </Button>
                <Button ghost>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </Menu.Item>
          }
          <Menu.Item>
          <CartIcon cart={cart} />
          </Menu.Item>
    </Menu>
    </Header>
        <hr />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        {children}
      </Content>
    <Footer style={{ textAlign: 'center' }}>
      Created by the Grace Shoe-Purr Team
    </Footer>
  </Layout>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    cart: state.cart
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
