/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
      const name = 'Mittens',
        description = 'For warmth and noise cancelling',
        price = 20,
        inventory = 1000,
        image = '/public/images/funny-baby-cat-sleeping-in-shoes-funny-hd-wallpaper.jpg'

    beforeEach(() => {
      return Product.create({
        name: name,
        description: description,
        price: price,
        inventory: inventory,
        image: image
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(name)
          expect(res.body[0].description).to.be.equal(description)
          expect(res.body[0].inventory).to.be.equal(inventory)
        })
    })
  })
})
