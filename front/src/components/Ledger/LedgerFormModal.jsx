import {  Modal, Form, Input, Select, InputNumber } from 'antd';
import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

// eslint-disable-next-line react/prop-types
const LedgerFormModal = ({isModalOpen, handleOk, handleCancel, record}) => {
  const [form] = Form.useForm();
  const [record_, setRecord_] = useState({
    name: null,
    type: null,
    accountID: null,
  }); 

  useEffect(() =>{
    if(record != null){
      setRecord_({
        name: record.name,
        type: record.type,
        accountID: record.accountID,
      });
      setTimeout(()=>{
        form.setFieldsValue({
          name: record.name,
          type: record.type,
          accountID: record.accountID,
        });
      });
    }
  }, [record]);

  return (
    <>
      <Modal title="Account" 
        destroyOnClose
        open={isModalOpen} 
        okText="OK"
        cancelText="Cancel"
        onOk={ () => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleOk(values, record_.accountID);
            })
            .catch((info) => {
              
            });
            
                  
        }}
        onCancel={handleCancel}
      >
        <Form
          preserve={false}
          form={form}
          name='basic'
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item 
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: '!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name="type"
            label="Type"
            rules={[
              {
                required: true,
                message: '!',
              },
            ]}
          >
            <Select>
              <Select.Option value={1}>Cash</Select.Option>
              <Select.Option value={2}>Card</Select.Option>
              <Select.Option value={3}>Electronic payment</Select.Option>
            </Select>
          </Form.Item>
              
          <Form.Item 
            hidden
            name="priority"
            label="Priority"
          >
            <InputNumber value={1} />
          </Form.Item>
              
        </Form>
      </Modal>
    </>
  );

};

LedgerFormModal.propTypes = {
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  record: PropTypes.object,
};

export default LedgerFormModal;