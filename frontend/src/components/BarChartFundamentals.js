import '../css/styles.css';
import { useState, React } from 'react';
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

const BarChartFundamentals = ({ data }) => {
  // https://codesandbox.io/s/recharts-with-legend-toggle-dqlts?file=/src/BarGraph.js:153-160
  let labels = [
    { key: 'enterpriseValueOverEBITDA', name: 'EV/EBITDA', color: '#8884d8' },
    { key: 'pbRatio', name: 'P/B', color: '#82ca9d' },
    { key: 'peRatio', name: 'P/E', color: '#cab282' },
  ];

  const [barProps, setBarProps] = useState(
    labels.reduce(
      (a, { key }) => {
        a[key] = false;
        return a;
      },
      { hover: null }
    )
  );

  const handleLegendMouseEnter = (e) => {
    if (!barProps[e.dataKey]) {
      setBarProps({ ...barProps, hover: e.dataKey });
    }
  };

  const handleLegendMouseLeave = (e) => {
    setBarProps({ ...barProps, hover: null });
  };

  const selectBar = (e) => {
    setBarProps({
      ...barProps,
      [e.dataKey]: !barProps[e.dataKey],
      hover: null,
    });
  };
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
            <XAxis dataKey="period" style={axisStyle} angle="1" dy={0} dx={0} />
            <YAxis dx={-20} style={axisStyle} />
            <Tooltip formatter={(value) => formatNumToTwoDecimal(value)} />
            <Legend
              align="right"
              verticalAlign="top"
              onClick={selectBar}
              onMouseOver={handleLegendMouseEnter}
              onMouseOut={handleLegendMouseLeave}
            />
            {labels.map((label, index) => (
              <Bar
                key={index}
                name={label.name}
                dataKey={label.key}
                fill={label.color}
                hide={barProps[label.key] === true}
                fillOpacity={Number(
                  barProps.hover === label.key || !barProps.hover ? 1 : 0.6
                )}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};
export default BarChartFundamentals;
