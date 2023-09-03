import { React, useState, useEffect } from 'react';
import { LedgerTable, LedgerFormModal } from '../../components';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './ledgerPage.css';
import { PropTypes } from 'prop-types';
import { http } from '../../utils';
import '../../../mock/ledger.js';


const LedgerPage = ({email, userID}) => {
  const types = ['', 'Cash', 'Card', 'Electronic payment'];
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [ledgerList, setLedgerList] = useState();
  const [record, setRecord] = useState();

  useEffect(() => {
    getLedgerList();
    
  }, []);

  const convertType = (LedgerData) => {
    const re = LedgerData.map((ledger) => {
      ledger.typeName = types[ledger.type];
      return ledger;
    });
    return re;
  };

  const getLedgerList = () => {
    const timestamp = Date.parse(new Date());
    const params = {
      'timestamp': timestamp,
      'apiVersion': 'v1.0',
      'param': {
        'user': {
          'email': email,
          'userID': userID
        },
      }
    };
    http.post('feature/getAccounts', params)
      .then((res)=>{
        if(res.data.api.status == 200){
          let ledgerData = res.data.result.queryData;
          ledgerData = convertType(ledgerData);
          setLedgerList(ledgerData);
        }else {
          message.error(`error ${res.data.api.status}`);
        }
          
      });
  };


  const handleAddLedger = () => {
    setIsAddModalOpen(true);
  };

  const handleAddOk = (values) => {
    const timestamp = Date.parse(new Date());
    const params = {
      'timestamp': timestamp,
      'apiVersion': 'v1.0',
      'param': {
        'user': {
          'email': email,
          'userID': userID,
        },
        'accountConfig': {
          'name': values.name,
          'priority': 0,
          'type': values.type
        }
      }
    };
    setIsAddModalOpen(false);
    http.post('feature/addAccount', params)
      .then((res)=>{
        if(res.data.api.status == 200){
          message.success('Add successfully');
        }
        getLedgerList();
      });
    
    
  };

  const handleCancel = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleEditLedger = (record) => {
    setRecord(record);
    setIsEditModalOpen(true);
    console.log(record);
  };

  const handleEditOk = (values, accountID) => {
    const date = new Date();
    const timestamp = Date.parse(date);
    const params = {
      'timestamp': timestamp,
      'apiVersion': 'v1.0',
      'param': {
        'user': {
          'email': email,
          'userID': userID,
        },
        'target': {
          'accountID': accountID,
          'isDelete': true,
          'newAccountConfig': null,
        }
      }
    };
    if(values != null){
      params.param.target.isDelete = false;
      params.param.target.newAccountConfig = {
        'name': values.name,
        'priority': 1,
        'type': values.type,
      };
    }

    setIsEditModalOpen(false);
    http.post('feature/editAccount', params).then((res) => {
      if (res.data.api.status == 200) {
        if(values != null){
          message.success('Edit successfully');
        }else {
          message.success('Delete successfully');
        }
        
        getLedgerList();
      } else {
        message.error('error ', res.data.api.status);
      }
    });
    
  };

  const handleDeleteLedger = (record) => {
    setRecord(record);
    handleEditOk(null, record.accountID);
  };

  return (
    <>
      <div className="topBar">
        <Button 
          className="addLedgerButton" 
          onClick={handleAddLedger} 
          icon={<PlusOutlined />}
        >
        </Button>
      </div>
      <div>
        <LedgerTable 
          ledgerList={ledgerList}
          handleEditLedger={handleEditLedger} 
          handleDeleteLedger={handleDeleteLedger}
        >
        </LedgerTable>
      </div>

      <LedgerFormModal
        isModalOpen={isAddModalOpen}  
        handleOk={handleAddOk}
        handleCancel={handleCancel}
      >
      </LedgerFormModal>
      <LedgerFormModal
        isModalOpen={isEditModalOpen}  
        handleOk={handleEditOk}
        handleCancel={handleCancel}
        record={record}
      >
      </LedgerFormModal>
        
    </>
  );

};

LedgerPage.propTypes = {
  email: PropTypes.string,
  userID: PropTypes.string,
};


export default LedgerPage;