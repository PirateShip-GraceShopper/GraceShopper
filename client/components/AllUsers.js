import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers, deleteUserThunk, makeToAdmin } from "../store/users";

class AllUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const users = this.props.users;
    const admins = this.props.admins;
    return (
      <div>
        <h3>Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length &&
              users.map(user => (
                <tr key={user.id}>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>
                    <button type="button" onClick={(e)=>this.props.makeAdmin(e,user)} >Make Admin</button>
                  </td>
                  <td>
                    <button
                      type="button"
                      value={user.id}
                      onClick={this.props.deleteUser}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <h3>Admins</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.length &&
              admins.map(admin => (
                <tr key={admin.id}>
                  <td>{`${admin.firstName} ${admin.lastName}`}</td>
                  <td>{admin.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapState = state => {
  return {
    users: state.users.filter(user => !user.isAdmin),
    admins: state.users.filter(user => user.isAdmin)
  };
};
const mapDispatch = (dispatch, ownProps) => {
  return {
    getAllUsers() {
      dispatch(fetchUsers());
    },
    deleteUser(evt) {
      evt.preventDefault();
      dispatch(deleteUserThunk(evt.target.value));
    },
    makeAdmin(evt, user) {
      evt.preventDefault();
      const editedUser = {
        id: user.id,
        isAdmin:true
      }
      dispatch(makeToAdmin(editedUser))
    }
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
