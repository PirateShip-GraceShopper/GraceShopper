import React, { Component } from "react";
import { connect } from "react-redux";
import ManageUsers from "./ManageUsers";
import ManageAdmins from "./ManageAdmins";
import { fetchUsers } from "../store/users";

class AllUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const users = this.props.users;
    const admins = this.props.admins;
    return (
      <div>
        <h2>Users</h2>
        <ManageUsers users={users} />
        <h2>Admins</h2>
        <ManageAdmins admins={admins} />
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
const mapDispatch = dispatch => {
  return {
    getAllUsers() {
      dispatch(fetchUsers());
    }
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
