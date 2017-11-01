import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editUser } from "../store/user";

class SingleUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formFirstName: "",
      formLastName: "",
      formEmail: "",
      formPassword: "",
      formPhone:""
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.setState({
      formFirstName: this.props.user.firstName,
      formLastName: this.props.user.lastName,
      formEmail: this.props.user.email,
      formPassword: this.props.user.password,
      formPhone: this.props.user.phone
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
          <label>First Name</label>
          <input type="firstName" name="firstName" value={this.state.formFirstName} onChange={(e)=> this.handleChange(e, "formFirstName")}/>
          <label>Last Name</label>
          <input type="lastName" name="lastName" value={this.state.formLastName} onChange={(e)=> this.handleChange(e, "formLastName")}/>
          <label>Email</label>
          <input type="email" name="email" value={this.state.formEmail} onChange={(e)=> this.handleChange(e, "formEmail")}/>
          <label>Password</label>
          <input type="password" name="password" value={this.state.formPassword} onChange={(e)=> this.handleChange(e, "formPassword")}/>
          <label>Phone</label>
          <input type="phone" name="phone" value={this.state.formPhone} onChange={(e)=> this.handleChange(e, "formPhone")}/>
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
      e.preventDefault();
      const editedUser = {
        id: user.id,
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        password: e.target.password.value,
        phone: e.target.phone.value
      }
      return dispatch(editUser(editedUser))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleUser);
