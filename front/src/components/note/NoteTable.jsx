import { Space, Table, Popconfirm } from 'antd';
import React from 'react';
import { PropTypes } from 'prop-types';
const { Column } = Table;


const NoteTable = (props) => {

  const data = props.noteList;

  return (
    <Table 
      dataSource={data}
      pagination={{
        position: ['bottomCenter'],
        // current: 1,
        // total: 4,
        pageSize: 10,
      }}
    >
      <Column title="Title" dataIndex="title" key="title"></Column>
      <Column title="Date" dataIndex="date" key="date" />
            
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <a onClick={() =>props.handleViewNote(record)}>View</a>
            <Popconfirm title="Sure to delete?" onConfirm={() => props.handleDeleteNote(record)}>
              <a>Delete</a>
            </Popconfirm>
          </Space>
        )}
      />
        
    </Table>
  );
};

NoteTable.propTypes = {
  handleViewNote: PropTypes.func.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  noteList: PropTypes.array.isRequired,
};

export default NoteTable;