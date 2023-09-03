import { http } from '../../utils';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { PropTypes } from 'prop-types';


const onFinishFailed = (errorInfo) => {

};
  
const LoginForm = ({onFinish}) => (
  <Form
    validateTrigger={['onBlur', 'onChange']}
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      offset: 4,
      span: 15,
    }}
    style={{
      maxWidth: 500,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email',
          validateTrigger:'onChange',
        },
        {
          pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
          message: 'Please input a correct email',
          validateTrigger:'onChange',
        }
      ]}
    >
      <Input placeholder="Email" />
    </Form.Item>
  
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password',
          validateTrigger:'onChange',
        },
          
      ]}
    >
      <Input.Password placeholder="Password" />
    </Form.Item>
  
  
  
    <Form.Item
      wrapperCol={{
        offset: 9,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
          Submit
      </Button>
    </Form.Item>
  </Form>
);


LoginForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default LoginForm;