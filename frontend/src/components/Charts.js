import '../css/styles.css';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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

const axisStyle = {
  fontFamily: 'sans-serif',
  fontSize: '100%',
  textAnchor: 'middle',
};
function Charts({ data }) {
  const price_data = data.historical;
  console.log(price_data);
  return (
    <Container>
      <div>
        <h4 className="text-center">Price</h4>
        <ResponsiveContainer height={400} width="100%">
          <LineChart
            width={1000}
            height={400}
            data={price_data}
            margin={{
              top: 5,
              right: 45,
              left: 20,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              style={axisStyle}
              angle="45"
              dy={20}
              dx={20}
            />
            <YAxis dx={-20} style={axisStyle} />
            <Tooltip />
            <Legend align="right" verticalAlign="top" />
            <Line
              name={data.symbol}
              type="monotone"
              dataKey="close"
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
}
export default Charts;
