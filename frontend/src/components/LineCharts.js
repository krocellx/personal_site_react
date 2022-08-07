import '../css/styles.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from 'recharts';

const axisStyle = {
  fontFamily: 'sans-serif',
  fontSize: '100%',
  textAnchor: 'middle',
};

function HistPriceLineChart({ ticker }) {
  // console.log(data);
  const price_data = ticker.historical;
  // console.log(price_data);
  return (
    <Container>
      <div>
        <h4 className="text-center">Price</h4>
        <ResponsiveContainer height={400} width="100%">
          <LineChart
            width={1000}
            height={350}
            data={price_data}
            // data={(price_data, benchmark.historical)}
            margin={{
              top: 5,
              right: 45,
              left: 20,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              allowDuplicatedCategory={false}
              dataKey="date"
              style={axisStyle}
              angle="20"
              dy={10}
              dx={0}
            />
            <YAxis dx={-20} style={axisStyle} />
            <Tooltip />
            <Legend align="right" verticalAlign="top" />
            <Line
              name={ticker.symbol}
              type="monotone"
              dataKey="close"
              stroke="#8884d8"
              dot={false}
            />

            <Brush height={30} y={350} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
}
export default HistPriceLineChart;
