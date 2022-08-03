import '../css/styles.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const axisStyle = {
  fontFamily: 'sans-serif',
  fontSize: '100%',
  textAnchor: 'middle',
};
function ReturnBarChart({ data }) {
  console.log(data);
  // console.log(price_data);
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
            <XAxis
              dataKey="year"
              style={axisStyle}
              angle="45"
              dy={20}
              dx={20}
            />
            <YAxis
              dx={-20}
              style={axisStyle}
              tickFormatter={(tick) => `${tick * 100}%`}
            />
            <Tooltip />
            <Legend align="right" verticalAlign="top" />
            <Bar dataKey="annual_return" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
}
export default ReturnBarChart;
