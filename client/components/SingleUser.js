import React, { Component } from 'react'
import { connect } from 'react-redux'
import NameForm from './NameForm'
import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'
import PhoneForm from './PhoneForm'
import { Button } from 'antd'

class SingleUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      showNameForm: false,
      showEmailForm: false,
      showPasswordForm: false,
      showPhoneForm: false,
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
        <li>{`Name: ${user.firstName} ${user.lastName}`} <Button onClick={(event) => this.showForm(event, 'showNameForm')} >edit</Button>
            {this.state.showNameForm && <NameForm user={user}/>}
        </li>
        <li>{`Email: ${user.email}`} <Button onClick={(event) => this.showForm(event, 'showEmailForm')}>edit</Button>
            {this.state.showEmailForm && <EmailForm user={user} />}
        </li>
        <li>{`Password: *******`} <Button onClick={(event) => this.showForm(event, 'showPasswordForm')}>edit</Button>
            {this.state.showPasswordForm && <PasswordForm user={user} />}
        </li>
        <li>{`Phone Number: ${user.phone ? user.phone:'(___)-___-___'}`} <Button onClick={(event) => this.showForm(event, 'showPhoneForm')}>edit</Button>
            {this.state.showPhoneForm && <PhoneForm user={user} />}
        </li>      
      </ul>
      )
  }
}

const mapState = ({ user }) => ({ user })

export default connect(mapState)(SingleUser)
