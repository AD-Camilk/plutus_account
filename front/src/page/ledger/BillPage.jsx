import { BillSelecter, BillTable, BillFormModal } from '../../components';
import { Button, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { React, useState, useEffect, } from 'react';
import './BillPage.css';
import { http } from '../../utils';
import { PropTypes } from 'prop-types';
import '../../../mock/bill.js';
import moment from 'moment';

const BillPage = ({ email, userID }) => {
  const types = [
    'Income',
    'Food',
    'Drinks',
    'transportation',
    'Shopping',
    'Entertainment',
    'Housing',
    'Electronics',
    'Medicine',
    'Other',
  ];
  const [ledgerList, setLedgerList] = useState();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [billList, setBillList] = useState();
  const [record, setRecord] = useState();

  useEffect(() => {
    getLedgerList();
    getBillList();
  }, []);

  const convertType = (billData) => {
    const re = billData.map((bill) => {
      bill.typeName = types[bill.type];
      return bill;
    });
    return re;
  };


  const getBillList = (values) => {

    const timestamp = Date.parse(new Date());
    const params = {
      timestamp: timestamp,
      apiVersion: 'v1.0',
      param: {
        user: {
          email: email,
          userID: userID,
        },
        filter: {
          activate: {
            time: false,
            type: false,
            account: false,
            cost: false,
          },
          time: {
            from: null,
            to: null,
          },
          type: null,
          account: null,
          cost: null,
        },
      },
    };
    if (values != null) {
      params.param.filter.activate.time = values.time != null ? true : false;
      params.param.filter.activate.type = values.type != null ? true : false;
      params.param.filter.activate.account =
        values.account != null ? true : false;
      params.param.filter.activate.cost = values.costMin != null ? true : false;
      params.param.filter.time.from =
        values.time != null ? values.timeRange[0] : null;
      params.param.filter.time.to = values.time != null ? values.timeRange[1] : null;
      params.param.filter.type = values.type != null ? values.type : null;
      params.param.filter.account =
        values.account != null ? values.account : null;
      params.param.filter.cost =
        values.costMin != null ? [values.costMin, values.costMax] : null;
    }

    http.post('feature/getBills', params).then((res) => {
      if (res.data.api.status == 200) {
        let billData = res.data.result.queryData;
        billData = convertType(billData);
        setBillList(billData);
      } else {
        message.error(`error ${res.data.api.status}`);
      }
    });
  };

  const getLedgerList = () => {
    const timestamp = Date.parse(new Date());
    const params = {
      timestamp: timestamp,
      apiVersion: 'v1.0',
      param: {
        user: {
          email: email,
          userID: userID,
        },
      },
    };
    http.post('feature/getAccounts', params).then((res) => {
      if (res.data.api.status == 200) {
        setLedgerList(res.data.result.queryData);
      } else {
        message.error('error ', res.data.api.status);
      }
    });
  };

  const handleAddBill = () => {
    setIsAddModalOpen(true);
  };


  const handleAddOk = (values) => {
    const date = new Date();
    const timestamp = Date.parse(date);
    const time = moment(date).format('YYYY-MM-DD HH:mm:ss');
    const params = {
      timestamp: timestamp,
      apiVersion: 'v1.0',
      param: {
        user: {
          email: email,
          userID: userID,
        },
        billConfig: {
          time: time, // "YYYY-MM-DD HH:MM:SS"
          cost: values.cost,
          tag: values.tag,
          expression: values.expression, // eg."12+2"
          type: values.type,
          account: values.account,
        },
      },
    };
    http.post('feature/addBill', params).then((res) => {
      if (res.data.api.status == 200) {
        message.success('add successfully');
        getBillList();
      } else {
        message.error('add error ', res.data.api.status);
      }
    });
    setIsAddModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setRecord(null);
  };

  const handleEditBill = (record) => {
    setRecord(record);
    setIsEditModalOpen(true);
  };

  const handleEditOk = (values, billID) => {
    const date = new Date();
    const timestamp = Date.parse(date);
    const params = {
      timestamp: timestamp,
      apiVersion: 'v1.0',
      param: {
        user: {
          email: email,
          userID: userID,
        },
        target: {
          billID: billID,
          isDelete: true,
          newBillConfig: null,
        },
      },
    };
    if(values != null){
      params.param.target.isDelete = false;
      params.param.target.newBillConfig = {
        time: record.time,
        cost: values.cost,
        tag: values.tag,
        expression: values.expression,
        type: values.type,
      };
    }
    setIsEditModalOpen(false);
    http.post('feature/editBill', params).then((res) => {
      if (res.data.api.status == 200) {
        if(values != null){
          message.success('edit successfully');
        }else {
          message.success('delete successfully');
        }
        getBillList();
      } else {
        message.error('error ');
      }
    });
    
    
  };

  const handleDeleteBill = (record) => {
    setRecord(record);
    handleEditOk(null, record.billID);
  };

  const handleSearch = (values) => {
    if (
      !(
        (values.costMax == null && values.costMin == null) ||
        (values.costMax != null && values.costMin != null)
      )
    ) {
      message.error('The minimum and maximum values need to be set at the same time');
      return;
    } 
    if(values.costMax<values.costMin){
      message.error('Minimum value cannot be greater than maximum value');
      return;
    }
    values.timeRange = [];
    if (values.time != null) {
      values.timeRange[0] = values.time[0].$d;
      values.timeRange[1] = values.time[1].$d;
    }

    getBillList(values);
  };

  return (
    <div>
      <div className="topBar">
        <BillSelecter
          className="billSelecter"
          types={types}
          ledgerList={ledgerList}
          handleSearch={handleSearch}
        ></BillSelecter>

        <Button
          className="addBillButton"
          onClick={handleAddBill}
          icon={<PlusOutlined />}
        ></Button>
      </div>
      <div>
        <BillTable
          billList={billList}
          handleEditBill={handleEditBill}
          handleDeleteBill={handleDeleteBill}
          handleEditOk={handleEditOk}
        ></BillTable>
      </div>
      <BillFormModal
        record={null}
        isModalOpen={isAddModalOpen}
        ledgerList={ledgerList}
        handleOk={handleAddOk}
        handleCancel={handleCancel}
      ></BillFormModal>
      <BillFormModal
        record={record}
        ledgerList={ledgerList}
        isModalOpen={isEditModalOpen}
        handleOk={handleEditOk}
        handleCancel={handleCancel}
      ></BillFormModal>
    </div>
  );
};

BillPage.propTypes = {
  email: PropTypes.string,
  userID: PropTypes.string,
};

export default BillPage;
