import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
function TestChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: -20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="date" tick={false} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="adjClose" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default TestChart;
