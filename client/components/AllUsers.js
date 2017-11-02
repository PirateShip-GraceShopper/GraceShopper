import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers, deleteUserThunk} from '../store/users'
import { Link } from "react-router-dom";

class AllUsers extends Component{
  componentDidMount(){
    this.props.getAllUsers()
  }
  render(){
    const users = this.props.users
    return(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
        {users.length && users.map(user => (
          <tr key={user.id}>
            <td>{`${user.firstName} ${user.lastName}`}</td>
            <td>{user.email}</td>
            <td>
            <button type="button" value={user.id} onClick={this.props.deleteUser}>Delete</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
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
    },
    deleteUser(evt){
      evt.preventDefault()
      dispatch(deleteUserThunk(evt.target.value))
    }
  }
}

export default connect(mapState, mapDispatch)(AllUsers)