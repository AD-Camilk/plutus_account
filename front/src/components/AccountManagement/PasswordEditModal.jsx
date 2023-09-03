import {  Modal, Form, Input, message } from 'antd';
import React from 'react';
import { PropTypes } from 'prop-types';

const PasswordEditModal = ({isModalOpen, handleOk, handleCancel}) => {
  const [form] = Form.useForm();
  return (
    <>
      <Modal 
  
        title="Edit password" 
        destroyOnClose
        okText="OK"
        cancelText="Cancel"
        open={isModalOpen} 
        onOk={ () => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              if(values.newPassword != values.confirmPassword){
                message.error('The confirmation password does not match the new password');
              }
              else{
                handleOk(values);
              } 
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        onCancel={handleCancel}>
        <Form
          preserve={false}
          form={form}
          labelCol={{
            span: 10,
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
            label="Old password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: '!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: '!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm new password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: '!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
    
        </Form>
      </Modal>
    </>
  );

};

PasswordEditModal.propTypes = {
  isModalOpen: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default PasswordEditModal;