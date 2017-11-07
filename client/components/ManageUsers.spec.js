/* global describe beforeEach it */

import { expect } from "chai";
import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import actualStore from "../store";
import {ManageUsers} from "./ManageUsers";
import ManageAdmins from "./ManageAdmins";
import {Table} from "antd";

const adapter = new Adapter();
enzyme.configure({ adapter });

describe("ManageUsers", () => {
  let manageUsers;
  beforeEach(() => {
    const users = [{firstName: 'cody', lastName: 'greene', email: 'cody@email.com', password: '123', phone: '2123334343'}, {firstName: 'Marlo', lastName: 'Kat', email: 'marlo@email.com', password: '123', phone: '2123312333'}];
    manageUsers = shallow(<ManageUsers users={users} />, { context: { store: actualStore } });
  });
  it("renders a <Table/>", () => {
    expect(manageUsers.find(Table).length).to.be.equal(1)
  });
});
