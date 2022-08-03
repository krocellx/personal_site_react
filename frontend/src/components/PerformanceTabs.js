import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PerformanceTable from './PerformanceTables';
import ReturnBarChart from './BarChart';

function PerformanceTabs({ data }) {
  const [key, setKey] = useState('Performance');
  const annualReturn = data.chart_data.annual_return;
  const performanceMetric = data.performance_metric;
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
      <Tab eventKey="Risk Measure" title="Risk Measure">
        <PerformanceTable performanceMetric={performanceMetric} />
      </Tab>
      <Tab eventKey="contact" title="Contact">
        Other
      </Tab>
    </Tabs>
  );
}

export default PerformanceTabs;
