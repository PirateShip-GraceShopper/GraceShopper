/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Address = db.model('address')

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

  describe('eager loading', () => {
    let cody;

    beforeEach(() => {
      let user = User.create({
        firstName: 'Cody',
        lastName: 'puppybook',
        phone: '2124455678',
        email: 'cody@puppybook.com',
        password: 'bones'
      })
      let address = Address.create({
        address1: '5 Hanover Sq',
        address2: 'Floor 25',
        city: 'New York',
        state: 'NY',
        zipcode: '10004'
      })
      return Promise.all([user, address])
        .then(([user, address]) => {
            return user.setAddress(address)
        })
        .then(newUser => {
          return User.findById(newUser.id)
        })
        .then(user => {
          cody = user;
        })
    })
    it('eagerly loads address information as an object', () => {
      expect(cody.address).to.be.an('object')
    })
    it('associated by addressId on the User model', () => {
      expect(cody.addressId).to.equal(cody.address.id)
    })
    it('matches the address info that was set on created user', () => {
      expect(cody.address.address1).to.equal('5 Hanover Sq')
      expect(cody.address.state).to.equal('NY')
      expect(cody.address.zipcode).to.equal('10004')
    })
  })
})
