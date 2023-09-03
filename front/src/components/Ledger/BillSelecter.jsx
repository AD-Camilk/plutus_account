import { Select,  Form, DatePicker, Button, InputNumber} from 'antd';
import React from 'react';
import { PropTypes } from 'prop-types';
import FormItem from 'antd/es/form/FormItem';
import moment from 'moment';


const { RangePicker } = DatePicker;

const BillSelecter = ({ledgerList, handleSearch, types}) => (
  <>
    <Form 
      layout='inline'
      wrapperCol={{
        span: '2px',
        offset: '2px'
      }}
      onFinish={handleSearch}
    >
      <Form.Item name='account'>
        <Select
          placeholder="Account"
          style={{
            width: 100,
          }}
          allowClear
        >
          {
            ledgerList?.map((item, index) => {
              return (
                <Select.Option value={item.accountID} key={index}>{item.name}</Select.Option>
              );
            })
          }
          
        </Select>
      </Form.Item>
    
      <Form.Item name='type'>
        <Select
          placeholder="Type"
          style={{
            width: 140,
          }}
          allowClear
        >
          {
            types?.map((item, index) => {
              return (
                <Select.Option value={index} key={index}>{item}</Select.Option>
              );
            })
          }
        </Select>
      </Form.Item>

      <Form.Item name='time'>
        <RangePicker />
      </Form.Item>
    
      <Form.Item name='costMin'>
        <InputNumber 
          prefix="￥"
          min={0} 
          placeholder="min"
        />
      </Form.Item>
      ~&nbsp;&nbsp;
      <FormItem name='costMax'>
        <InputNumber 
          prefix="￥"
          min={0}  
          placeholder="max"
        />
      </FormItem>
      <Form.Item>
        <Button type="primary" htmlType='submit'>Search</Button>
      </Form.Item>
    
    
    </Form>
  </>
    
    
);

BillSelecter.propTypes = {
  ledgerList: PropTypes.array,
  types: PropTypes.array,
  handleSearch: PropTypes.func.isRequired,
};

export default BillSelecter;