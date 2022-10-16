import '../css/styles.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatNumToPercentage } from '../utility/formatter.js';

const axisStyle = {
  fontFamily: 'sans-serif',
  fontSize: '100%',
  textAnchor: 'middle',
};
function ReturnBarChart({ data }) {
  // console.log(data);
  return (
    <Container>
      <div>
        <h4 className="text-center">Annual Return</h4>
        <ResponsiveContainer height={400} width="100%">
          <BarChart
            width={1000}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 45,
              left: 20,
              bottom: 40,
            }}
          >
            <XAxis dataKey="year" style={axisStyle} angle="1" dy={0} dx={0} />
            <YAxis
              dx={-20}
              style={axisStyle}
              tickFormatter={(tick) => formatNumToPercentage(tick)}
            />
            <Tooltip formatter={(value) => formatNumToPercentage(value)} />
            <Legend align="right" verticalAlign="top" />
            <Bar name={data[0].symbol} dataKey="annual_return" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
}
export default ReturnBarChart;
