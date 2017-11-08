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
      })
      .then(_=> {
        return User.create({
          email:"seb@email.com",
          password:"123",
          firstName:"Seb",
          lastName: "Astion",
        })
      })
      .then(_=>(
        testApp
        .post('/auth/login')
        .send({email: adminEmail, password: '123'})
        ))
    })


    it('GET /api/users when user has admin status', () => {
     return testApp
      .get('/api/users')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body).length.to.be(2)
        expect(res.body.find(user=>user.id===1).email).to.be.equal(adminEmail)
      })
    })

    it('GET /api/users fails when user is not admin', () => {
      return testApp
      .post('/auth/logout')
      .send({})
      .then(_=>{
        testApp
        .post('/auth/login')
        .send({email:'seb@email.com', password:'123'})
      })
      .then(_=>{
        testApp
        .get('/api/users')
        .expect(500)
      })

    })

  }) // end describe('/api/users')
}) // end describe('User routes')
