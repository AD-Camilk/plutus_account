/* eslint-disable max-len */
import { DatePicker, Button, Form } from 'antd';
import React from 'react';
import 'dayjs/locale/zh-cn';

const ReportSelecter = (props) => {
  // eslint-disable-next-line react/prop-types
  const {createData} = props;
  let m;
  return (
    <>
      <Form layout='inline'>
        <Form.Item>
          <DatePicker onChange={(v)=> m = v} picker="month" />
        </Form.Item>
        <Form.Item>
          <Button type="primary"  onClick={
            ()=> m ? createData(`${m.$y}-${m.$M + 1}`) : alert('please select the month')
          } >check</Button>
        </Form.Item>
      </Form>
    </>
    
  );
};

export default ReportSelecter;