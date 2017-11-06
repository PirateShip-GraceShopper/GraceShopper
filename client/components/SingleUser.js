import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "../store/user";
import NameForm from "./NameForm"
import EmailForm from "./EmailForm"
import PasswordForm from "./PasswordForm"
import PhoneForm from "./PhoneForm"
import { Button } from "antd";

class SingleUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      showNameForm: false,
      showEmailForm: false,
      showPasswordForm: false,
      showPhoneForm: false
    }
    this.showForm = this.showForm.bind(this)
  }
  showForm(evt, type){
    evt.preventDefault()
    this.setState({[type]: !this.state[type]})
  }
  render() {
    const user = this.props.user
    return (
      <ul>
        <li>{`Name: ${user.firstName} ${user.lastName}`} <Button onClick={(e)=>this.showForm(e, "showNameForm")} >edit</Button>
            {this.state.showNameForm && <NameForm user={user}/>}
        </li>
        <li>{`Email: ${user.email}`} <Button onClick={(e)=>this.showForm(e, "showEmailForm")}>edit</Button>
            {this.state.showEmailForm && <EmailForm user={user}/>}
        </li>
        <li>{`Password: *******`} <Button onClick={(e)=>this.showForm(e, "showPasswordForm")}>edit</Button>
            {this.state.showPasswordForm && <PasswordForm user={user}/>}
        </li>
        <li>{`Phone Number: ${user.phone}`} <Button onClick={(e)=>this.showForm(e, "showPhoneForm")}>edit</Button>
            {this.state.showPhoneForm && <PhoneForm user={user}/>}
        </li>
      </ul>
      )
  }
}

const mapState = state => {
  return {
    user: state.user
  };
};

export default connect(mapState)(SingleUser)