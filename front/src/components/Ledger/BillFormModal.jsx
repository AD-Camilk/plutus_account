import {  Modal, Form, Input, Select, InputNumber } from 'antd';
import { React, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';


// eslint-disable-next-line react/prop-types
const BillFormModal = ({isModalOpen, handleOk, handleCancel, record, ledgerList}) => {
  const [form] = Form.useForm();
  const [cost, setCost] = useState();
  const [record_, setRecord_] = useState({
    account: null,
    type: null,
    cost: null,
    tag: null,
    expression: null,
  }); 

  useEffect(() =>{
    if(record != null){
      setRecord_({
        account: record.account,
        type: record.type,
        cost: record.cost,
        tag: record.tag,
        expression: record.expression,
      });
      setCost(record.cost);
      setTimeout(()=>{
        form.setFieldsValue({
          account: record.account,
          type: record.type,
          cost: record.cost,
          tag: record.tag,
          expression: record.expression,
        });
      }, );
      
    }
  
  }, [record, isModalOpen]);

  const handleChangeEval = (e) => {
    const value = e.target.value;
    setCost(eval(value));
  };
  
  return (
    <>
      <Modal 
        title="Bill" 
        destroyOnClose
        okText="OK"
        cancelText="Cancel"
        open={isModalOpen} 
        onOk={ () => {
          form
            .validateFields()
            .then((values) => {
              values.cost = cost;
              form.resetFields();
              if(record == null){
                handleOk(values);
              }else {
                handleOk(values, record.billID);
              }
                
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
          setCost(null);
        }} 
        onCancel={() => {
          handleCancel();
          setCost(null);
        }}
      >
        <Form
          preserve={false}
          form={form}
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
            name="Account"
            label="Account"
            rules={[
              {
                required: true,
                message: '!',
              },
            ]}
          >
            <Select>
              {
                ledgerList?.map((item, index) => {
                  return (
                    <Select.Option value={item.accountID} key={index}>{item.name}</Select.Option>
                  );
                })
              }
            </Select>
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
              <Select.Option value={0}>Income</Select.Option>
              <Select.Option value={1}>Food</Select.Option>
              <Select.Option value={2}>Drinks</Select.Option>
              <Select.Option value={3}>Transportation</Select.Option>
              <Select.Option value={4}>Shopping</Select.Option>
              <Select.Option value={5}>Entertainment</Select.Option>
              <Select.Option value={6}>Housing</Select.Option>
              <Select.Option value={7}>Electronics</Select.Option>
              <Select.Option value={8}>Medicine</Select.Option>
              <Select.Option value={9}>Other</Select.Option>
            </Select>
          </Form.Item>
            
          <Form.Item 
            name="tag"
            label="Tag"
            rules={[
              {
                required: true,
                message: '!',
              },
            ]}
          >
            <Input></Input>
          </Form.Item>

          <Form.Item 
            name="expression"
            label="Expression"
            rules={[
              {
                pattern:/^(?:-?\d+(?:\.\d+)?(?:[+\-*\/]\d+(?:\.\d+)?)*|\((?:(?:-?\d+(?:\.\d+)?)[+\-*\/])*(?:-?\d+(?:\.\d+)?)\))(?:[+\-*\/](?:-?\d+(?:\.\d+)?|\((?:(?:-?\d+(?:\.\d+)?)[+\-*\/])*(?:-?\d+(?:\.\d+)?)\)))*$/,
                required: true,
                message: '!',
              },
            ]}
          >
            <Input onChange={handleChangeEval}></Input>
          </Form.Item>
    
          <Form.Item label="Cost">
            <InputNumber readOnly value={cost}/>
          </Form.Item>
    
        </Form>
      </Modal>
    </>
  );

};

BillFormModal.propTypes = {
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  record: PropTypes.object,
  ledgerList: PropTypes.array,
};

export default BillFormModal;