import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import { Icon, Layout, Menu } from 'antd'

const { Header, Footer, Content } = Layout
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = ({ children, handleClick, isLoggedIn }) => (
  <Layout>
    <Header style={{ position: 'fixed', width: '100%' }}>
      <div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
            <Menu.Item key='home'>
            <Link to={'/'}><h1>Grace Shoe-Purr</h1></Link>
            </Menu.Item>
          <nav>
            {
              isLoggedIn
                ? <div>
                  {/* The navbar will show these links after you log in */}

                    <Link to="/">Home</Link>
                    <a href="#">Logout</a>

                </div>
                : <div>
                  {/* The navbar will show these links before you log in */}

                    <Link to="/login"><Icon type="login" />Login</Link>

                    <Link to="/signup">Sign Up</Link>

                </div>
            }
          </nav>
      </Menu>
      </div>
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
    isLoggedIn: !!state.user.id
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
