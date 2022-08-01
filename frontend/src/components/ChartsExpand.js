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
function ChartsExpand({ data }) {
  const price_data = data.historical;
  return (
    <Container>
      <div>
        <h4>{data.symbol}</h4>
        <ResponsiveContainer height={200} width="100%">
          <LineChart
            data={price_data}
            margin={{
              top: 5,
              right: 45,
              left: 20,
              bottom: 40,
            }}
          >
            <XAxis
              dataKey="date"
              style={axisStyle}
              angle="45"
              dy={20}
              dx={20}
            />
            <YAxis dx={-20} style={axisStyle} />
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
export default ChartsExpand;
