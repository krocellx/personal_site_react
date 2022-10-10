import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PerformanceTable from './PerformanceTables';
import BarChartFundamentals from './BarChartFundamentals';
import ReturnBarChart from './AnnualReturnBarChart';

function PerformanceTabs({ returnData, fundamentalData }) {
  const [key, setKey] = useState('Performance');
  const annualReturn = returnData.chart_data.annual_return;
  const performanceMetric = returnData.performance_metric;
  // setAnnualReturn(data.data.chart_data.annual_return);
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="Performance" title="Performance">
        <ReturnBarChart data={annualReturn} />
      </Tab>
      <Tab eventKey="Fundamental" title="Fundamental">
        <BarChartFundamentals performanceMetric={fundamentalData} />
      </Tab>
      <Tab eventKey="Risk Measure" title="Risk Measure">
        <PerformanceTable performanceMetric={performanceMetric} />
      </Tab>
    </Tabs>
  );
}

export default PerformanceTabs;
