import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../store/users'
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
              <Link to={`/user/${user.id}/edit`}>Edit</Link>
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
    }
  }
}

export default connect(mapState, mapDispatch)(AllUsers)