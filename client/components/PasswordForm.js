import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editUser } from '../store/user'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item

class PasswordForm extends Component {
  constructor() {
    super()
    this.checkConfirm = this.checkConfirm.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt){
    evt.preventDefault()
    const id = this.props.user.id
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) this.props.makeEdit(id, values.password)
    })
  }
  checkPassword(rule, value, callback){
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) callback('Passwords do not match!')
    else callback()
  }

  checkConfirm(rule, value, callback){
    const form = this.props.form
    if (value) form.validateFields(['confirm'], { force: true })
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                validator: this.checkConfirm
              }
            ]
          })(
            <Input
              type="password"
              name="password"
            />
          )}
        </FormItem>
        <FormItem label="Confirm Password" hasFeedback>
        {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const mapDispatch = dispatch => ({
  makeEdit(id, password) {
    const editedUser = {
      id,
      password
    }
    return dispatch(editUser(editedUser))
  }
})

export default connect(null, mapDispatch)(Form.create()(PasswordForm))
