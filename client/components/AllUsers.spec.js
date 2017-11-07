/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AllUsers } from './AllUsers';
import actualStore from '../store';
import ManageUsers from './ManageUsers';
import ManageAdmins from './ManageAdmins';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('AllUsers', () => {
  let allUsers;
  beforeEach(() => {
    allUsers = shallow(<AllUsers getAllUsers={function(){}} />, { context: { store: actualStore } });
  });
  it('has ManageUsers component', () => {
    expect(allUsers.find(ManageUsers).length).to.be.equal(1);
  });
  it('has ManageAdmins component', () => {
    expect(allUsers.find(ManageAdmins).length).to.be.equal(1);
  });
});
