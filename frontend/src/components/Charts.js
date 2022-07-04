import '../css/styles.css';
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
    <Container className="mt-4">
      <Row className="justify-content-center">
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
          <text
            x={1000 / 2}
            y={20}
            fill="black"
            textAnchor="middle"
            dominantBaseline="central"
          >
            <tspan fontSize="14">{data.symbol}</tspan>
          </text>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" style={axisStyle} angle="45" dy={20} dx={20} />
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
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </Row>
    </Container>
  );
}
export default Charts;
