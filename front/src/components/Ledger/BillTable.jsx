/* eslint-disable react/prop-types */
import { React } from 'react';
import { PropTypes } from 'prop-types';
import { Space, Table, Popconfirm } from 'antd';
const { Column } = Table;


const BillTable = ({handleEditBill, handleDeleteBill, billList }) => {
  
  const data = billList;

  return(
    <Table 
      dataSource={data}
      pagination={{
        position: ['bottomCenter'],
        // current: 1,
        // total: {total},
        pageSize: 10,
      }}
    >
      <Column title="Type" dataIndex="typeName" key="typeName"></Column>
      <Column title="Tag" dataIndex="tag" key="tag" />
      <Column title="Cost" dataIndex="cost" key="cost" />
      <Column title="Account" dataIndex="accountName" key="accountName"></Column>
      <Column title="Time"  dataIndex="time" key="time"></Column>
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <a onClick={() => handleEditBill(record)}>Edit</a>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteBill(record)}>
              <a>Delete</a>
            </Popconfirm>
          </Space>
        )}
      />
      
    </Table>
  );
};



export default BillTable;