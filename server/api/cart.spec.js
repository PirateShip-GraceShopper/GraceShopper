/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart', () => {
    let cart;
    beforeEach(() => {
      return Cart.create({
        status: 'open'
      })
      .then(createdCart => {
        cart = createdCart
      })
    })

    it('PUT /api/cart/:id changes status from open to purchased', () => {
      return request(app)
        .put('/api/cart/' + cart.id)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.be.equal('purchased')
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
