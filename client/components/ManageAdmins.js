import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

const ManageAdmins = ({ admins }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    }
  ];
  const data = admins.map(admin => ({
    key: admin.id,
    name: `${admin.firstName} ${admin.lastName}`,
    email: admin.email
  }));
  return <Table columns={columns} dataSource={data} />;
};

const mapState = null;

export default connect(mapState)(ManageAdmins);
