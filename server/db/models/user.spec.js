/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          firstName: 'Cody',
          lastName: 'puppybook',
          phone: '2124455678',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('hooks', () => {
    describe('setSaltAndPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          firstName: 'Cody',
          lastName: 'puppybook',
          phone: '2124455678',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('sets user.salt to a crypto salt', () => {
        // const salt = cody.
        // expect(cody.user.to.be.equal(true)
      })

      it('sets the password with encryption ', () => {
        // expect(cody.password.to.be.equal()
      })
    }) // end describe('correctPassword')
  })  
}) // end describe('User model')
