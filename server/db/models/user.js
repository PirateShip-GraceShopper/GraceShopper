const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Address = require('./address')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    set(val) {
      const newFirstName = val[0].toUpperCase() + val.slice(1)
      this.setDataValue('firstName', newFirstName)
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    set(val) {
      const newLastName = val[0].toUpperCase() + val.slice(1)
      this.setDataValue('lastName', newLastName)
    }
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  phone: {
    type: Sequelize.STRING,
  }
},
  {
    defaultScope: {
      include: [ {model: Address }]
    }
  })

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
