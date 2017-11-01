/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Item = db.model('item')

describe('Item routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/items/', () => {

    beforeEach(() => {
      return Item.create({
        price: 500,
        quantity: 12
      })
    })

    it('GET /api/items', () => {
      return request(app)
        .get('/api/items')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].price).to.be.equal(500)
        })
    })
  }) // end describe('/api/items')
}) // end describe('Item routes')
