
import { InputNumber } from 'antd';
import React from 'react';

const onChange = (value) => {
  console.log('changed', value);
};
const CostSelecter = () => (
  <>
    <InputNumber 
      prefix="￥"
      min={0} 
      onChange={onChange} 
      style={{
      }}
    />
        &nbsp;~&nbsp;
    <InputNumber 
      prefix="￥"
      min={0}  
      onChange={onChange} 
      style={{
      }}
    />
    
  </>


    
) ;
export default CostSelecter;