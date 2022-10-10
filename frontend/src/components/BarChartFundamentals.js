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
import { formatNumToTwoDecimal } from '../utility/formatter.js';

const axisStyle = {
  fontFamily: 'sans-serif',
  fontSize: '100%',
  textAnchor: 'middle',
};
function BarChartFundamentals({ data }) {
  console.log(data);
  return (
    <Container>
      <div>
        <h4 className="text-center">Valuation</h4>
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
            <XAxis dataKey="date" style={axisStyle} angle="1" dy={0} dx={0} />
            <YAxis
              dx={-20}
              style={axisStyle}
              // tickFormatter={(tick) => formatNumToPercentage(tick)}
            />
            <Tooltip formatter={(value) => formatNumToTwoDecimal(value)} />
            <Legend align="right" verticalAlign="top" />
            {/* <Bar
              name={'EV/EBITDA'}
              dataKey="enterpriseValueMultiple"
              fill="#8884d8"
            /> */}
            <Bar name={'P/B'} dataKey="priceBookValueRatio" fill="#82ca9d" />
            <Bar name={'P/E'} dataKey="priceEarningsRatio" fill="#cab282" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
}
export default BarChartFundamentals;
