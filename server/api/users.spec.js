/* global describe beforeEach it */

const {expect} = require('chai')
const supertest = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const adminEmail = 'admin@puppybook.com'
    const testApp = supertest.agent(app)
    beforeEach(() => {
      return User.create(
      {
        email: adminEmail,
        password: '123',
        firstName: 'Kitty',
        lastName: 'Admin',
        phone: '212-233-MEOW',
        isAdmin: true        
      }).then(_=>(
        testApp
        .post('/auth/login')
        .send({email: adminEmail, password:'123'})        
        ))
    })


    it('GET /api/users', () => {
     return testApp
          .get('/api/users')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body).length.to.be(1)
            expect(res.body[0].email).to.be.equal(adminEmail)
          })
  })
  }) // end describe('/api/users')
}) // end describe('User routes')
