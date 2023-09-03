/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import { Divider, Empty, message } from 'antd';
import { ReportCharts, ReportSelecter } from '../../components';
import React, {useState} from 'react';
import { http } from '../../utils';

const ReportPage = ({ email, userID }) => {
  const [data, setData] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const createData = (d) => {
    const param = {
      timestamp: new Date().getTime(),
      apiVersion: 'v1.0',
      param: {
        user: {email: email, userID: userID},
        filter: {time: d}
      }
    };
    http.post('financial/getMonthReport', param).then((res) => {
      if (res.data.api.status == 200) {
        const rawData = res.data.result.summary;
        const types = ['Income', 'Food', 'Drinks', 'Transportation', 'Shopping', 'Entertainment', 'Housing', 'Electronics', 'Medicine', 'Other'];
        const datas = rawData.map((e) => {
          return {
            sum: e.sum,
            type: types[e.type],
            percentage: e.percentage
          };
        });
        setData(datas);
        setDataReady(true);
      } else {
        message.error(`error ${res.data.api.status}`);
      }
    });
  };
  return (
    <>
      <ReportSelecter createData={createData}></ReportSelecter>
      <Divider></Divider>
      {
        dataReady ? 
          <ReportCharts data={data}></ReportCharts> :
          <Empty></Empty>
      }
    </>
  );
};

export default ReportPage;