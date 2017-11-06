/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllUsers} from './AllUsers'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllUsers', () => {
  let allUsers

  beforeEach(() => {
    allUsers = shallow(<AllUsers email={'cody@email.com'} />)
  })

  it('renders the email in an h3', () => {
    expect(allUsers.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
