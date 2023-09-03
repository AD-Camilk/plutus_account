import { DatePicker, Button, Space, Form } from 'antd';
import React from 'react';

const NoteSelecter = () => {

  return (
    <>
      <Form layout='inline'>
        <Form.Item>
          <DatePicker/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit'>Search</Button>
        </Form.Item>
      
      </Form>
    </>
    
            
    
  );
};

export default NoteSelecter;