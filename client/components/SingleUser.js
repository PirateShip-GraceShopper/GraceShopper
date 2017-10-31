import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editUser } from "../store/user";

class SingleUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formName: "",
      formEmail: "",
      formPassword: ""
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.setState({
      formName: this.props.user.name,
      formEmail: this.props.user.email,
      formPassword: this.props.user.password
    })
  }

  handleChange(evt, type){
    this.setState({[type]: evt.target.value})

  }
  render() {
    return (
      <div>
        <h2>Login & Security</h2>
        <form onSubmit={(e)=>this.props.handleSubmit(e, this.props.user)}>
          <label>Name</label>
          <input type="name" name="name" value={this.state.formName} onChange={(e)=> this.handleChange(e, "formName")}/>
          <label>Email</label>
          <input type="email" name="email" value={this.state.formEmail} onChange={(e)=> this.handleChange(e, "formEmail")}/>
          <label>Password</label>
          <input type="password" name="password" value={this.state.formPassword} onChange={(e)=> this.handleChange(e, "formPassword")}/>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(e, user){
      console.log("IN SINGLE USER COMPORNENT!!!!!!!", user)
      e.preventDefault();
      const editedUser = {
        id: user.id,
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
      }
      return dispatch(editUser(editedUser))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleUser);
