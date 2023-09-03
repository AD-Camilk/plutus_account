/* eslint-disable react/prop-types */
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LabelList, Pie, PieChart } from 'recharts';
import React from 'react';


const ReportCharts = (props) => {
  const data = props.data;
  return (
    <PieChart width={500} height={300}>
      <Pie data={data} dataKey='sum' nameKey='percentage' fill="#82ca9d" label>
        <LabelList dataKey='type' position="insideTop" ></LabelList>
      </Pie>
    </PieChart>
  );
};

export default ReportCharts;
