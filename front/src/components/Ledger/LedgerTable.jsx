import { Space, Table, Popconfirm } from 'antd';
import React from 'react';
import { PropTypes } from 'prop-types';

const { Column } = Table;

const LedgerTable = ({handleEditLedger, handleDeleteLedger, ledgerList}) => {
  const data = ledgerList;
  return(
    <Table 
      dataSource={data}
      pagination={{
        position: ['bottomCenter'],
        // current: 1,
        // total: 4,
        pageSize: 10,
      }}
    >
      <Column title="Name" dataIndex="name" key="name"></Column>
      <Column title="Type" dataIndex="typeName" key="typeName" />
      
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <a onClick={() => handleEditLedger(record)}>Edit</a>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteLedger(record)}>
              <a>Delete</a>
            </Popconfirm>
          </Space>
        )}
      />
      
    </Table>

  );
  
};

LedgerTable.propTypes = {
  handleEditLedger: PropTypes.func.isRequired,
  handleDeleteLedger: PropTypes.func.isRequired,
  ledgerList: PropTypes.array,
};

export default LedgerTable;