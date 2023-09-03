import {  Modal, Form, Input } from 'antd';
import React from 'react';
import { PropTypes } from 'prop-types';

const NoteFormModal = (props) => {
  const [form] = Form.useForm();

  return (
    <>
      <Modal title="Note" 
        destroyOnClose
        okText="OK"
        cancelText="Cancel"
        // eslint-disable-next-line react/prop-types
        open={props.isModalOpen} 
        onOk={ () => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              props.handleOk(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        onCancel={props.handleCancel}
      >
        <Form
          preserve={false}
          form={form}
          labelCol={{
            span: 4,
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
            name="title"
            label="Title"
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

NoteFormModal.propTypes = {
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default NoteFormModal;