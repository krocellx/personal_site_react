import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import React from 'react';

const axisStyle = {
  fontFamily: 'sans-serif',
  fontSize: '100%',
  textAnchor: 'middle',
};

const RollingExposureLineChart = ({ data }) => (
  <div>
    <h4 className="text-center">Rolling 90-calendar day Regression Analysis</h4>
    <ResponsiveContainer height={400} width="100%">
      <LineChart
        width={1000}
        height={350}
        data={data}
        margin={{
          top: 5,
          right: 45,
          left: 20,
          bottom: 40,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" style={axisStyle} angle="20" dy={10} />
        <YAxis dx={-20} style={axisStyle} />
        <Tooltip />
        <Legend align="right" verticalAlign="top" />
        <Line
          type="monotone"
          dataKey="I/A"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          dot={false}
        />
        <Line type="monotone" dataKey="ME" stroke="#82ca9d" dot={false} />
        <Line type="monotone" dataKey="Rm-Rf" stroke="#ffc658" dot={false} />
        <Line type="monotone" dataKey="ROE" stroke="#fd6b19" dot={false} />
        <Line type="monotone" dataKey="Const" stroke="#fd206b" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default RollingExposureLineChart;
