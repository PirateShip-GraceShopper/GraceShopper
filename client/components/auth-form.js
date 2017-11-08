import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Form, Input, Button } from "antd"
const FormItem = Form.Item

class AuthForm extends Component {
  constructor(){
    super()
    this.checkConfirm = this.checkConfirm.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }

  formSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const user = this.props.name === 'login' ?
        {
          email: values.email,
          password: values.password,
          cartId: this.props.cartId
        }
        :{
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        cartId: this.props.cartId
        }
        this.props.handleSubmit(user, this.props.name)
      }
    });
  }
  checkPassword(rule, value, callback){
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Passwords do not match!");
    } else {
      callback();
    }
  }

  checkConfirm(rule, value, callback){
    const form = this.props.form;
    if (value) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  }

  render(){
  const {name, displayName, handleSubmit, error, cartId} = this.props
  const { getFieldDecorator } = this.props.form;
  return (
    <div>
      <Form onSubmit={this.formSubmit} name={name}>
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
        {(name === 'login') &&
        <FormItem label="Password" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              }
            ]
          })(
            <Input
              type="password"
              name="password"
            />
          )}
        </FormItem>
      }
        {(name ==='signup') && (
        <div>
            <FormItem label="Password" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
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
            <FormItem label="First Name">
            {getFieldDecorator("firstName", {
              rules: [
                { required: true, message: "Please input your name" }
              ]
            })(<Input />)}
            </FormItem>
            <FormItem label="Last Name">
            {getFieldDecorator("lastName", {
              rules: [
                { required: true, message: "Please input your last name" }
              ]
            })(<Input />)}
            </FormItem>
            <FormItem label="Phone Number">
            {getFieldDecorator("phone", {
              rules: [
                { required: true, message: "Please input your phone number!" }
              ]
            })(<Input />)}
            </FormItem>
          </div>
          )}
        <FormItem>
          <Button type="primary" htmlType="submit">{displayName}</Button>
        </FormItem>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
  }
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    cartId: state.cartId,
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    cartId: state.cartId,
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (user, formName) {
      dispatch(auth(user, formName))
    }
  }
}


export const Login = connect(mapLogin, mapDispatch)(Form.create()(AuthForm))
export const Signup = connect(mapSignup, mapDispatch)(Form.create()(AuthForm))

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
