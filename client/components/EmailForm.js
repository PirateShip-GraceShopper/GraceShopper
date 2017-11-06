import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "../store/user";
import { Form, Input, Button } from "antd";
const FormItem = Form.Item;

class EmailForm extends Component {
  constructor() {
    super();
   this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    const id=this.props.user.id
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.makeEdit(id, values.email)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="Email" hasFeedback>
        {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
          <Input/>
          )}
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
  makeEdit(id, email) {
    const editedUser = {
      id,
      email
    };
    return dispatch(editUser(editedUser));
  }
});

export default connect(mapState, mapDispatch)(Form.create()(EmailForm));
