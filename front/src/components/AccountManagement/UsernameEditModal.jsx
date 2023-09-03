/* eslint-disable react/prop-types */
import {  Modal, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

// eslint-disable-next-line react/prop-types
const UsernameEditModal = ({isModalOpen, handleOk, handleCancel, username}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    setTimeout(()=>{
      form.setFieldsValue({
        username: username
      });
    }, );
  });
  return (
    <>
      <Modal 
        title="Edit username" 
        destroyOnClose
        okText="OK"
        cancelText="Cancel"
        open={isModalOpen} 
        onOk={ () => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleOk(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        onCancel={handleCancel}
      >
        <Form
          preserve={false}
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 12,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item 
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: '!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
        </Form>
      </Modal>
    </>
  );

};

UsernameEditModal.propTypes = {
  isModalOpen: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default UsernameEditModal;