import React from 'react'
import { connect } from 'react-redux'
import { deleteUserThunk, makeToAdmin } from '../store/users'
import { Table, Popconfirm } from 'antd'
import axios from 'axios'

export const ManageUsers = ({ users, makeAdmin, deleteUser, sendEmail }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, user) => {
        return (
          <span>
            <Popconfirm
              title="Are you sure?"
              onConfirm={e => {
                deleteUser(e, user)
              }}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Delete</a>
            </Popconfirm>
            <span className="ant-divider" />
            <Popconfirm
              title="Are you sure?"
              onConfirm={e => {
                makeAdmin(e, user)
              }}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Make Admin</a>
            </Popconfirm>
            <span className="ant-divider" />
            <Popconfirm
              title="Are you sure?"
              onConfirm={e => {
                sendEmail(e, user)
              }}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Request Password Reset</a>
            </Popconfirm>
          </span>
        )
      }
    }
  ]

  const data = users.map(user => ({
    key: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email
  }))

  return <Table columns={columns} dataSource={data} />
}

const mapState = null
const mapDispatch = dispatch => {
  return {
    deleteUser(evt, user) {
      evt.preventDefault()
      dispatch(deleteUserThunk(user.key))
    },
    makeAdmin(evt, user) {
      evt.preventDefault()
      const editedUser = {
        id: user.key,
        isAdmin: true
      }
      dispatch(makeToAdmin(editedUser))
    },
    sendEmail(evt, user) {
      evt.preventDefault()
      const email = {
        id: user.key,
        toEmail: user.email,
        name: 'Password change request from Grace Shoe-Purr!',
        message: `Dear ${user.name},
                To change your account password at Grace Shoe-Purr, please click this link or copy and paste it to your browser: https://grace-shoe-purr.herokuapp.com/password_reset`
      }
      return axios.post('/api/mailer/send', email)
      .then(res => res.data)
      .catch(err => console.error(err))
    }
  }
}

export default connect(mapState, mapDispatch)(ManageUsers)
