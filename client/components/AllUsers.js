import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../store/users'

class AllUsers extends Component{
  componentDidMount(){
    this.props.getAllUsers()
  }
  render(){
    const users = this.props.users
    return(
      <div>
        <ul>
        {users.length && users.map(user => (<li key={user.id}>
          <div>{`${user.firstName} ${user.lastName}`}</div>
          <div>{user.email}</div>
          </li>))}
        </ul>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.users
  }
}
const mapDispatch = (dispatch) => {
  return {
    getAllUsers(){
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(AllUsers)