import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "../store/user";
import { Form, Input, Button } from "antd";
const FormItem = Form.Item;

class NameForm extends Component {
  constructor() {
    super();
    this.state = {
      formFirstName: "",
      formLastName: ""
    };
  }

  handleChange(evt, type) {
    this.setState({ [type]: evt.target.value });
  }
  
  render() {
    return (
      <Form onSubmit={e=>this.props.handleSubmit(e,this.props.user)}>
        <FormItem label="First Name">
          <Input
            name="firstName"
            value={this.state.formFirstName}
            onChange={e => this.handleChange(e, "formFirstName")}
          />
        </FormItem>
        <FormItem label="Last Name">
          <Input
            name="lastName"
            value={this.state.formLastName}
            onChange={e => this.handleChange(e, "formLastName")}
          />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const mapState = null
const mapDispatch = dispatch => ({
  handleSubmit(e, user) {
    e.preventDefault();
    const editedUser = {
      id: user.id,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
    };
    return dispatch(editUser(editedUser));
  }
});

export default connect(mapState, mapDispatch)(NameForm);
