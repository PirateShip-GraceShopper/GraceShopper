import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "../store/user";
import { Form, Input, Button } from "antd";
const FormItem = Form.Item;

class PhoneForm extends Component {
  constructor() {
    super();
    this.state = {
      formPhone: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const user = this.props.user;
    this.setState({
      formPhone: user.phone
    });
  }
  handleChange(evt) {
    this.setState({ formPhone: evt.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const id = this.props.user.id;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.makeEdit(id, values.phone);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Please input your phone number!" }
            ]
          })(<Input name="phone" onChange={e => this.handleChange(e)} />)}
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

const mapState = null;
const mapDispatch = dispatch => ({
  makeEdit(id, phone) {
    const editedUser = {
      id,
      phone
    };
    return dispatch(editUser(editedUser));
  }
});

export default connect(mapState, mapDispatch)(Form.create()(PhoneForm));
